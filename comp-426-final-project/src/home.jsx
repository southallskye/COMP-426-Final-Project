//this file controls the main page and adding/deleting trips
import React, { useState } from 'react';
import Trip from './trip';

function Home({ setCurrentPage }) {
  const [trips, setTrips] = useState([]);
  const navigateToStart = () => {
    setCurrentPage('start');
  };
  function logOut(){
    alert('Logging out...');
    navigateToStart();
  }

  
  const addTrip = () => {
    const newTrip = {
      id: Date.now(), //this can be changed
      //API call parameters go here
    };
    setTrips([...trips, newTrip]); 
  };

  
  const deleteTrip = (id) => {
    setTrips(trips.filter((trip) => trip.id !== id)); 
  };

  return (
    <>
      <h2>urmomdotcom's trips</h2>
      <button onClick={addTrip}>Create New Trip</button>
      <button onClick={logOut}>Log Out</button>

      {trips.map((trip) => (
        <Trip key={trip.id} trip={trip} onDelete={deleteTrip} />
      ))}
    </>
  );
}

export default Home;