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
      const tripId = Math.random().toString(36).substr(2, 9);
      const newTrip = {
        trip_id: tripId,
        city: "City"
        // Other trip properties
      };
      setTrips([...trips, newTrip]);

      //POST new trip
    };
    
    const deleteTrip = (id) => {
      setTrips(trips.filter((trip) => trip.id !== id)); 
      fetch('/api/trip', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      })
      .then(() => {
        // what to do here 
      })
      .catch(error => {
        // handle the error
        alert(error.message);
      });
    };
  
    return (
      <>
        <h2>urmomdotcom's trips</h2>
        <button onClick={addTrip}>Create New Trip</button>
        <button onClick={logOut}>Log Out</button>
        
        {trips.length === 0 ? (
          <h4>You currently have no trips</h4>
        ) : (
          trips.map((trip) => (
            <div className="trip" key={trip.id}>
              <Trip trip={trip} onDeleteTrip={deleteTrip} />
            </div>
          ))
        )}
      </>
    );
  }

export default Home;