//this file controls trips and adding/deleting events
import React, { useState } from 'react';
import Event from './event'; 

function Trip({ id, onDeleteTrip }) { //api call parameters would go in function header

    //api call will go here as part of the Trip function
  const [expanded, setExpanded] = useState(false);
  const [events, setEvents] = useState([]);

  const handleExpand = () => {
    setExpanded(true);
  };

  const handleHide = () => {
    setExpanded(false);
  };

  const handleAddEvent = () => {
    
    const eventId = Math.random().toString(36).substr(2, 9);
    //any api call parameters needed for an event would go here
    setEvents([...events, { id: eventId }]);
  };

  const handleSaveTrip = () => {
    
  };

  const handleDeleteTrip = () => {
    onDeleteTrip(id);
  };

  const handleDeleteEvent = (eventId) => {
    
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
  };

  const [tripData, setTripData] = useState("Trip data will go here eventually.");

  return (
    <>
      <h3>Trip {id}</h3>
      <textarea
        value={tripData}
        onChange={(e) => setTripData(e.target.value)}
      />
      {/*the textarea above would be replaced with info needed for the api call*/}
      {/*this is where the results of the api call will go*/}
      <button onClick={handleExpand}>Expand Events</button>
      <button onClick={handleHide}>Hide Events</button>
      <button onClick={handleAddEvent}>Add Event</button>
      <button onClick={handleSaveTrip}>Save Trip</button>
      <button onClick={handleDeleteTrip}>Delete Trip</button>

      {expanded && events.map(event => (
        <Event key={event.id} id={event.id} onDeleteEvent={handleDeleteEvent} />
      ))}
    </>
  );
}

export default Trip;