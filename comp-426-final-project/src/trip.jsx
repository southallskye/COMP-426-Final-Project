import React, { useState } from 'react';
import Event from './event'; 

function Trip({ id, onDeleteTrip }) {
  const [expanded, setExpanded] = useState(false);
  const [events, setEvents] = useState([]);

  const [weather, setWeather] = useState(null);

  const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  const weatherApiKey = '5179943790412546d5501fb308a6219c';

  const handleExpand = () => {
    setExpanded(true);
  };

  const handleHide = () => {
    setExpanded(false);
  };

  const handleAddEvent = () => {
    const eventId = Math.random().toString(36).substr(2, 9);
    setEvents([...events, { id: eventId }]);
    //POST event
  };

  const handleSaveTrip = async () => {
    try {
      const weatherResponse = await fetch(`${weatherApiUrl}?q=${encodeURIComponent("Location")}&appid=${weatherApiKey}&units=imperial`);
      const weatherData = await weatherResponse.json();
      setWeather(weatherData);
      // Handle weather data, update state or display
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDeleteTrip = () => {
    alert('deleting trip');

    fetch('/api/trip', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    })
    .then(() => {
      // what to do here 
      expanded = 0;
    })
    .catch(error => {
      // handle the error
      alert(error.message);
    });
    onDeleteTrip(id);
  };

  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
    //DELETE event
  };

  const [tripData, setTripData] = useState("Trip data will go here eventually."); //inputs for 3rd party API requests

  return (
    <>
      <h3>Trip {id}</h3>
      <textarea
        value={tripData}
        onChange={(e) => setTripData(e.target.value)} //inputs for 3rd party API requests
      />
      {/*results from 3rd party API would go here */}
      <button onClick={handleExpand} style={{ display: expanded ? 'none' : 'block' }}>Expand Events</button>
      <button onClick={handleHide} style={{ display: expanded ? 'block' : 'none' }}>Hide Events</button>
      {expanded && (
        <button onClick={handleAddEvent}>Add Event</button>
      )}
      <button onClick={handleSaveTrip}>Save Trip</button>
      <button onClick={handleDeleteTrip}>Delete Trip</button>

      {expanded && events.length === 0 && (
        <p>You have no events</p>
      )}

      {expanded && events.length > 0 && (
        <div className="event">
          {events.map((event) => (
            <Event key={event.id} id={event.id} onDeleteEvent={handleDeleteEvent} />
          ))}
        </div>
      )}
      <div id="weather">
        {/* Display weather data here */}
      </div>
    </>
  );
}

export default Trip;