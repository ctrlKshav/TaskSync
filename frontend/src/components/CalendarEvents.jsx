import React, { useState } from 'react';
import './Calendar.css'; // Ensure styles are defined here

const CalendarEvents = ({ setEvents }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventName, setEventName] = useState('');

  const renderHeader = () => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return (
      <div className="header">
        <button onClick={prevMonth} className='bg-primary text-white border-primary p-1 px-3'>&lt;</button>
        <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
        <button onClick={nextMonth} className='bg-primary text-white border-primary p-1 px-3'>&gt;</button>
      </div>
    );
  };

  const prevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const renderDays = () => {
    const daysInWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="days">
        {daysInWeek.map((day, index) => (
          <div key={index} className="day-name">{day}</div>
        ))}
      </div>
    );
  };

  const renderDates = () => {
    const dates = [];
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
      dates.push(<div key={`empty-${i}`} className="date empty"></div>);
    }
    
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
      dates.push(
        <div key={day} className="date" onClick={() => handleDateClick(dateKey)}>
          <div className="date-number">{day}</div>
        </div>
      );
    }
    
    return <div className="dates">{dates}</div>;
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const addEvent = () => {
    if (eventName) {
      setEvents((prevEvents) => ({
        ...prevEvents,
        [selectedDate]: eventName,
      }));
      setEventName('');
      setShowModal(false);
    }
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderDates()}

      
    </div>
  );
};

export default CalendarEvents;
