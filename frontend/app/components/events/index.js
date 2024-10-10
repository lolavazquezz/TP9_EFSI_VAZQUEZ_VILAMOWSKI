"use client"
import React from 'react';
import Event from '../Event';
import styles from "./events.module.css";


const Events = ({ events }) => {
  return (
    <div className={styles.eventslist}>
      {events.map(event => (
        <Event key={event.id} event={event} />
      ))}
    </div>
  );
};

export default Events;
