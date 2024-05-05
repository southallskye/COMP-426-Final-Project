import React, { useState } from 'react';
import Event from './event'; 

function Trip({ id, city, onDeleteTrip }) {
  const [expanded, setExpanded] = useState(false);
  const [events, setEvents] = useState([]);
  const [tripStart, setTripStart] = useState('');
  const [tripEnd, setTripEnd] = useState('');
  const [weather, setWeather] = useState(null);
  const [tripTitle, setTripTitle] = useState("Trip " + id);
  const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  const weatherApiKey = '5179943790412546d5501fb308a6219c';

  // const handleExpand = () => {
  //   setExpanded(true);
  // };

  // const handleHide = () => {
  //   setExpanded(false);
  // };

  // const handleAddEvent = () => {
  //   const eventId = Math.random().toString(36).substr(2, 9);
  //   setEvents([...events, { id: eventId }]);
  //   //POST event
  // };

  const handleSaveTrip = async () => {
    try {
      const weatherResponse = await fetch(`${weatherApiUrl}?q=${encodeURIComponent(city)}&appid=${weatherApiKey}&units=imperial`);
      const weatherData = await weatherResponse.json();
      setWeather(weatherData);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error
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

  const handleStartDateChange = (e) => {
    setTripStart(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setTripEnd(e.target.value);
  };

  // const handleDeleteEvent = (eventId) => {
  //   const updatedEvents = events.filter((event) => event.id !== eventId);
  //   setEvents(updatedEvents);
  //   //DELETE event
  // };

  const [tripData, setTripData] = useState(city); //inputs for 3rd party API requests

  return (
    <>
      <input 
        type="text" 
        value={tripTitle} 
        onChange={(e) => setTripTitle(e.target.value)} 
      />
      <input
      type=""
        value={tripData}
        onChange={(e) => setTripData(e.target.value)}
      />
      <input 
        type="date" 
        value={tripStart} 
        onChange={handleStartDateChange} 
      />
      <input 
        type="date" 
        value={tripEnd} 
        onChange={handleEndDateChange} 
      />
      {weather && (
        <div>
          <p>Weather: {weather.main.temp} °F</p>
          {/* Display other weather data here */}
        </div>
      )}
      <button onClick={handleSaveTrip}>Save Trip</button>
      <button onClick={handleDeleteTrip}>Delete Trip</button>
    </>
  );
}

export default Trip;