//this file controls events
import React, { useState } from 'react';

function Event({ id, onDeleteEvent }) {//api call parameters would go in function header
    //api call goes in here
  const [eventData, setEventData] = useState("Event data will eventually be here");

  const handleSaveEvent = () => {
    
  };

  const handleDeleteEvent = () => {
    onDeleteEvent(id);
  };

  return (
    <>
      <h4>Event {id}</h4>
      <textarea
        value={eventData}
        onChange={(e) => setEventData(e.target.value)}
      />
      {/*texarea above would be replaced with inputs for api call*/}
      {/*results of api call would go here*/}
      <button onClick={handleSaveEvent}>Save Event</button>
      <button onClick={handleDeleteEvent}>Delete Event</button>
    </>
  );
}

export default Event;