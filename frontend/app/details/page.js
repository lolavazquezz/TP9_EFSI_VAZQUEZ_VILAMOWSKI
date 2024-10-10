"use client"
import React, { useEffect, useState } from 'react'; 
import { useRouter } from 'next/navigation'; 
import styles from './page.module.css';
import Footer from "../components/footer";
import { format } from "date-fns";


const EventDetails = () => {
  const router = useRouter();
  const [event, setEvent] = useState(null); 
  const [shortDate, setShortDate] = useState('');

  useEffect(() => {
    const storedEvent = sessionStorage.getItem("selectedEvent");
    if (storedEvent) {
      const parsedEvent = JSON.parse(storedEvent);
      setEvent(parsedEvent);
      setShortDate(format(new Date(parsedEvent.start_date), "dd/MM/yyyy")); // Formatea la fecha
    } else {
      router.push('/'); 
    }
  }, [router]);

  const handleEnroll = (e) => {
    router.push("/enroll");
  };

  if (!event) return null;

  return (
      <main className={styles.mainContent}>
        <a href="/" className={styles.back}>← Events</a>
        <h1 className={styles.eventTitle}>{event.event_name}</h1>

        <div className={styles.eventImagePlaceholder}>
          <img src={event.image} alt={event.event_name} />
        </div>

        <div className={styles.detailsContent}>
          <div className={styles.priceEnroll}>
            <span className={styles.price}>Price: ${event.price}</span>
            <button onClick={handleEnroll} className={styles.enrollButton}>
              Enroll
            </button>
          </div>

          <p className={styles.description}>Detalles</p>

          <div className={styles.details}>
            <p>Date: {shortDate}</p>
            <p>Location: {event.event_location}</p>
            <p>Tag: {event.event_tag}</p>
            <p>Duration: {event.duration_in_minutes} minutes</p>
            <p>Category: {event.event_category}</p>
            <p>Max Assistance: {event.max_assistance} people</p>
          </div>
        </div>
        <Footer />
      </main>
  );
};

export default EventDetails;
