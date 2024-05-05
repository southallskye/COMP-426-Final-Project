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
  //const weatherApiKey = '5179943790412546d5501fb308a6219c';
  const weatherApiKey = 'b8a286429efbdadebe4aa6638acf1b93';

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
      const apiUrl = `${weatherApiUrl}?q=${encodeURIComponent(city)}&appid=${weatherApiKey}&units=imperial`;
      const weatherResponse = await fetch(apiUrl);
      if (!weatherResponse.ok) {
        throw new Error('Failed to fetch weather data: ' + weatherResponse.statusText);
      }
      const weatherData = await weatherResponse.json();
      setWeather(weatherData);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error
    }
  };

  const handleDeleteTrip = () => {
    alert('deleting trip');

    fetch('http://localhost:3001/api/trip', {
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
        placeholder="City"
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
      {weather !== null && (
  <div className="weather-info">
    <h4>Weather Information</h4>
    <p>Temperature: {weather.main.temp} °C</p>
    <p>Feels Like: {weather.main.feels_like} °C</p>
    <p>Weather Conditions: {weather.weather[0].description}</p>
    <p>Humidity: {weather.main.humidity}%</p>
    <p>Wind Speed: {weather.wind.speed} meter/sec</p>
    {/* Add more weather information as needed */}
  </div>
)}
      <button onClick={handleSaveTrip}>Save Trip</button>
      <button onClick={handleDeleteTrip}>Delete Trip</button>
    </>
  );
}

export default Trip;