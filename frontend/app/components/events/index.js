import React from 'react';
import Event from '../Event';
//import styles from "./events.module.css";


const Events = ({ eventsList }) => {
  return (
    <div className="events-list">
      {eventsList.map(event => (
        <Event key={event.id} event={event} />
      ))}
    </div>
  );
};

export default Events;
