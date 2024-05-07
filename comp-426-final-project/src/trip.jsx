import React, { useState } from 'react';
import Event from './event'; 
import { fetchData } from './api_call';

function Trip({ id, city, onDeleteTrip , startDate, endDate, priorState}) {
  const [expanded, setExpanded] = useState(false);
  const [events, setEvents] = useState([]);
  const [tripStart, setTripStart] = useState(startDate);
  const [tripEnd, setTripEnd] = useState(endDate);
  const [weather, setWeather] = useState(null);
  const [tripTitle, setTripTitle] = useState("Trip #" + id);
  const [tripData, setTripData] = useState(city);
  const username = localStorage.getItem('username');


  const loadWeather = async () => {
    try {
      const weatherData = await fetchData(tripData);
      console.log("Weather data received:", JSON.stringify(weatherData));
      console.log("returned successfully");
      setWeather(parseWeather(weatherData)); // Update weather state
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error
    }
  }

  const handleSaveTrip = async () => {
      console.log("Username in trip");
      console.log(username);
      const fetch_url = 'http://localhost:3001/api/trip/' + username;

    fetch(fetch_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, tripStart, tripEnd, tripData })
      })
      .then(() => {
        // handle successful response
        const alert_message = (`Trip sucessfully created with id = ?`, [id]);
        alert(alert_message);
      })
      .catch(error => {
        // handle error
        alert(error.message);
      });
    loadWeather();
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
      setExpanded(false); // Instead of expanded = 0;
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

  const parseWeather = (weatherData) => {
    if (!weatherData) {
      return null;
    }

    const { name, main, weather } = weatherData;
    const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;

    return {
      name: name,
      iconUrl: iconUrl,
      temperature: main.temp,
      description: weather[0].description
    };
  };

  // how to make show weather button be removed once it is pressed

  return (
    <>
      <input className="trip-title"
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
        <div className="weather-info">
          <h2>Weather in {weather.name}</h2>
          <img src={weather.iconUrl} alt={weather.description} />
          <p>Temperature: {weather.temperature} °F</p>
          <p>Weather Conditions: {weather.description}</p>
        </div>
      )}
      <button onClick={handleSaveTrip}>Save Trip</button>
      <button onClick={handleDeleteTrip}>Delete Trip</button>
      <button onClick={loadWeather}>Load Weather</button>
    </>
  );
}

export default Trip;