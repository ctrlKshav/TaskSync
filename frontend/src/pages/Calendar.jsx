import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';
import EventComp from '../components/EventComp'
import CalendarEvents from '../components/CalendarEvents';

const Calendar = () => {
  
  return (
    <><div className='d-flex flex-column'>
    <NavBar props={{'title':"Calendar"}} />
    <div className='d-flex'>
      <Sidebar />
     <EventComp />
     {/* <CalendarEvents /> */}
      </div>
      </div>
    </>
  );
  
};

export default Calendar;
