//this file controls events
import React, { useState, useEffect } from 'react';

function Event({ id, onDeleteEvent }) {//api call parameters would go in function header
    //api call goes in here
  const [eventData, setEventData] = useState("Event data will eventually be here");

  const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  const weatherApiKey = '5179943790412546d5501fb308a6219c';
  const eventsApiUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';
  const eventsApiKey = 'n5x4As9PgHDtnmnKDJ3WXFLk8MLCXAVA';

  const handleSaveEvent = async () => {
    try {
      const weatherResponse = await fetch(`${weatherApiUrl}?q=${encodeURIComponent(location)}&appid=${weatherApiKey}&units=imperial`);
      const weatherData = await weatherResponse.json();
      // Handle weather data, update state or display
      
      const eventsResponse = await fetch(`${eventsApiUrl}?city=${encodeURIComponent(location)}&apikey=${eventsApiKey}`);
      const eventsData = await eventsResponse.json();
      // Handle events data, update state or display
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  const handleDeleteEvent = () => {
    onDeleteEvent(id);
  };

  return (
    <>
      <h4>Event {id}</h4>
      {/* Input fields for location */}
      <button onClick={handleSaveEvent}>Save Event</button>
      <button onClick={handleDeleteEvent}>Delete Event</button>
      {/* Display weather and events data */}
      <div id="weather">
        {/* Display weather data here */}
      </div>
      <div id="events">
        {/* Display events data here */}
      </div>
    </>
  );
  
}

export default Event;