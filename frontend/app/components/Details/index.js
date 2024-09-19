import React from "react";
import styles from "./Details.module.css"; // Asegúrate de importar tu archivo de estilos

const Details = ({ event }) => {
  return (
    <div className={styles.container}>
          <main className={styles.mainContent}>
        <a href="/events" className={styles.back}>← Events</a>
        <h1 className={styles.eventTitle}>{event.name}</h1>

        <div className={styles.eventImagePlaceholder}>
          <img src={event.image} alt={event.name} className={styles.img} />
        </div>

        <div className={styles.detailsContent}>
          <div className={styles.priceEnroll}>
            <span className={styles.price}>Price: ${event.price}</span>
            <button className={styles.enrollButton}>Enroll</button>
          </div>

          <p className={styles.description}>{event.description}</p>

          <div className={styles.details}>
            <p>Date: {event.date}</p>
            <p>Location: {event.location}</p>
            <p>Tag: {event.tag}</p>
            <p>Duration: {event.duration} minutes</p>
            <p>Category: {event.category}</p>
            <p>Max Assistance: {event.maxAssistance} people</p>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Details;
