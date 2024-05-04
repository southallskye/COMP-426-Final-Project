//this file controls events
import React, { useState, useEffect } from 'react';

function Event({ id, onDeleteEvent }) {//api call parameters would go in function header
    //api call goes in here
  const [eventData, setEventData] = useState("Event data will eventually be here");

  const handleSaveEvent = async () => {
    try {
      const weatherResponse = await fetch(`${weatherApiUrl}?q=${encodeURIComponent("Location")}&appid=${weatherApiKey}&units=imperial`);
      const weatherData = await weatherResponse.json();
      // Handle weather data, update state or display
      
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
    </>
  );
  
}

export default Event;