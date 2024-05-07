//this file controls the main page and adding/deleting trips
import React, { useState } from 'react';
import Trip from './trip';

function Home({ setCurrentPage }) {
    const [trips, setTrips] = useState([]);
    const navigateToStart = () => {
      setCurrentPage('start');
    };
    const username = localStorage.getItem('username');

    let trip_ids = [];
    const trips_test = [];
  
    function logOut(){
      alert('Logging out...');
      navigateToStart();
    }

    async function getPriorTrips() {
      const username = localStorage.getItem('username');
      console.log("Username");
      console.log(username);
      const fetch_url = 'http://localhost:3001/api/trip/' + username;
      console.log('fetch_url');
      console.log(fetch_url);
      try {
        const trips = await fetch(fetch_url, { // replace user1 with the variable for username
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const parsed_trips = await trips.json()

        return parsed_trips; // or parsed_trips
      } catch(error) {
          alert(error.message);
      }
    }

    const oldTrips = () => {
      getPriorTrips().then(result => {
        // do things with the result here, like call functions with them
        // set up trips here with data
        const parsed_result = JSON.parse(result);
        // for (let i = 0; i < parsed_result.length; i++) {
        //   parsed_result.i.
        // }
        // for (let i = 0; i < parsed_result.length; i++) {
        //   trip_ids.push(parsed_result[i].trip_id)
        //   setTrips([...trips, parsed_result[i]]);
        //   console.log("Trips at");
        //   console.log(i);
        //   console.log(trips);
        //   trips_test.push(parsed_result[i]);
        // }
        setTrips(...trips, parsed_result);
        console.log(parsed_result);
        console.log(trip_ids);
        console.log("Trips");
        console.log(trips);
      })
  }

    // fetch('http://localhost:3001/api/trip', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then((response) => {
    //   // what to do here 
    //   console.log("Response here");
    //   console.log(response.json());
    // })
    // .then((data) => {
    //   console.log("Data here");
    //   console.log(JSON.parse(data));
    // })
    // .catch(error => {
    //   // handle the error
    //   alert(error.message);
    // })

    
    const addTrip = () => {
      const tripId = Math.random().toString(36).substr(2, 9);
      const newTrip = {
        trip_id: tripId,
        username: username,
        start_date: '',
        end_date: '',
        location: "City",
        prior: false
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

    // how to make load old trips button be removed once it is pressed
    
    // how to make "your" be replaced by the username variable?
  
    return (
      <>
        <h2>username's trips</h2>
        <button onClick={oldTrips}>Load Old Trips</button>
        <button onClick={addTrip}>Create New Trip</button>
        <button onClick={logOut}>Log Out</button>
        
        {trips.length === 0 ? (
          <h4>You currently have no trips</h4>
        ) :   
        (
          trips.map((trip) => (
            <div className="trip" key={trip.trip_id}>
              <Trip trip={trip} id = {trip.trip_id} onDeleteTrip={deleteTrip} startDate = {trip.start_date} endDate = {trip.end_date} city = {trip.location} priorState = {trip.prior}/>
            </div>
          ))
        )}
      </>
    );
  }

export default Home;