"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
//import styles from "./event.module.css";


const Event = ({ event }) => {
  const router = useRouter();

  const handleDetails = () => {
    router.push(`/Events/${event.id}`);
  };
  
  

  return (
    <div className="event">
      <img src={event.image} alt={event.name} className="event-image" />
      <h3>{event.name}</h3>
      <p>{event.date}</p>
      <button className="enroll-button">Enroll</button>
      <button onClick={handleDetails} className="details-button">Details</button>
    </div>
  );
};

export default Event;
