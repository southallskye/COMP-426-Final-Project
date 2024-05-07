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

    fetch('http://localhost:3001/api/trip', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      // what to do here 
      console.log("Response here");
      console.log(response.json());
    })
    .catch(error => {
      // handle the error
      alert(error.message);
    })

    
    const addTrip = () => {
      const tripId = Math.random().toString(36).substr(2, 9);
      const newTrip = {
        id: tripId
      };
      setTrips([...trips, newTrip]);

      //POST new trip
    };
    
    const deleteTrip = (id) => {
      console.log(trips);
      console.log(id);
      setTrips(trips.filter((trip) => trip.id !== id)); 
      console.log(trips);
      fetch('http://localhost:3001/api/trip', {
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
              <Trip trip={trip} id = {trip.id} onDeleteTrip={deleteTrip} />
            </div>
          ))
        )}
      </>
    );
  }

export default Home;