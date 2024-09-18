"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from "./event.module.css";


const Event = ({ event }) => {
  const router = useRouter();

  const handleDetails = () => {
    router.push(`/Events/${event.id}`);
  };
  
  

  return (
    <div className={styles.event}>
        <img src={event.image} alt={event.name} className={styles.img} />
        <div>
            <h3 className={styles.h3}>{event.name}</h3>
            <p className={styles.p}>{event.date}</p>
        </div>
        <div className={styles.content}>
            <button className={styles.enrollbutton}>Enroll</button>
            <button onClick={handleDetails} className={styles.detailsbutton}>Details</button>
        </div>
    </div>
);
};

export default Event;
