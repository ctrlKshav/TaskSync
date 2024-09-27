import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CalendarEvents from './CalendarEvents';


const EventComp = () => {
  
  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
  const API_KEY = import.meta.env.VITE_API_KEY
  const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
  const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

  const [isScriptsLoaded, setIsScriptsLoaded] = useState(false);
  const [tokenClient, setTokenClient] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [events, setEvents] = useState({}); // Change to object
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadScripts = () => {
      if (!isScriptsLoaded) {
        const script1 = document.createElement('script');
        script1.src = 'https://apis.google.com/js/api.js';
        script1.onload = gapiLoaded;
        document.body.appendChild(script1);

        const script2 = document.createElement('script');
        script2.src = 'https://accounts.google.com/gsi/client';
        script2.onload = gisLoaded;
        document.body.appendChild(script2);

        setIsScriptsLoaded(true);
      }
    };

    const gapiLoaded = () => {
      gapi.load('client', initializeGapiClient);
    };

    const initializeGapiClient = async () => {
      await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
      });

      const storedToken = localStorage.getItem('accessToken');
      if (storedToken) {
        gapi.client.setToken({ access_token: storedToken });
        setIsAuthorized(true);
        await listUpcomingEvents();
      }

      setIsLoading(false);
    };

    const gisLoaded = () => {
      const client = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (resp) => {
          if (resp.error) {
            throw resp;
          }
          const token = gapi.client.getToken().access_token;
          localStorage.setItem('accessToken', token);
          setIsAuthorized(true);
          listUpcomingEvents();
          setIsLoading(false);
        },
      });
      setTokenClient(client);
    };

    loadScripts();
  }, [isScriptsLoaded, tokenClient]);

  const handleAuthClick = () => {
    if (tokenClient) {
      tokenClient.requestAccessToken({ prompt: gapi.client.getToken() === null ? 'consent' : '' });
      setIsLoading(true);
    }
  };

  const handleSignoutClick = () => {
    const token = gapi.client.getToken();
    if (token) {
      google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken(null);
      localStorage.removeItem('accessToken');
      setIsAuthorized(false);
      setEvents({}); // Clear events
    }
  };

  const listUpcomingEvents = async () => {
    try {
      const request = {
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime',
      };
      const response = await gapi.client.calendar.events.list(request);
      const fetchedEvents = response.result.items;

      const formattedEvents = {};
      fetchedEvents.forEach(event => {
        const start = event.start.dateTime || event.start.date;
        formattedEvents[start] = event.summary; // Store events with start time as key
      });

      setEvents(formattedEvents); // Set the events object
    } catch (err) {
      console.error(err.message);
    }
  };

  const formatDate = (dateTime) => {
    const date = new Date(dateTime);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };

  return (
    <div className="container mt-4">

<h2 className="mb-4 text-center">Google Calendar Events</h2>
      <div className="mb-3 d-flex justify-content-center">
        {isLoading ? (
          <button className="btn btn-secondary" disabled>
            Loading...
          </button>
        ) : isAuthorized ? (
          
            <div className='d-flex'>
              <button className="btn btn-danger me-2" onClick={handleSignoutClick}>Sign Out</button>
              <button className="btn btn-primary" onClick={listUpcomingEvents}>Refresh</button>
            </div>
          
        ) : (
          <button className="btn btn-success" onClick={handleAuthClick}>Authorize</button>
        )}
      </div>

      <CalendarEvents events={events} setEvents={setEvents}/>

      
      <div className="card mt-5">
        <div className="card-body text-center bg-primary">
          <h5 className="card-title mb-3 ">Upcoming Events</h5>
          {Object.keys(events).length === 0 ? (
            <p className="card-text bg-dark text-white">No Events Found</p>
          ) : (
            <ul className="list-group ">
              {Object.entries(events).map(([start, summary], index) => (
                <li key={index} className="list-group-item">
                  {summary} <span className="text-muted">({formatDate(start)})</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventComp;
