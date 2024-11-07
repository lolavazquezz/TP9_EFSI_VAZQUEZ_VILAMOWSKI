"use client";
import React, { useEffect, useState } from 'react'; 
import { useRouter } from 'next/navigation'; 
import styles from './page.module.css';
import Footer from "../components/footer";
import { format } from "date-fns";
import EnrollModal from '../components/enrollModal';

const EventDetails = () => {
  const router = useRouter();
  const [event, setEvent] = useState(null); 
  const [shortDate, setShortDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const onEnroll = (eventId) => {
    setSelectedEventId(eventId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEventId(null);
  };

  useEffect(() => {
    const storedEvent = sessionStorage.getItem("selectedEvent");
    if (storedEvent) {
      const parsedEvent = JSON.parse(storedEvent);
      setEvent(parsedEvent);
      setShortDate(format(new Date(parsedEvent.start_date), "dd/MM/yyyy"));
    } else {
      router.push('/'); 
    }
  }, [router]);

  if (!event) return null;

  return (
    <main className={styles.mainContent}>
      <a href="/" className={styles.back}>← Events</a>
      <h1 className={styles.eventTitle}>{event.event_name}</h1>

      <div className={styles.detailsContent}>
        <div className={styles.priceEnroll}>
          <span className={styles.price}>${event.price}</span>
          <button onClick={() => onEnroll(event.id)} className={styles.enrollbutton}>
            Enroll
          </button>
        </div>

        <p className={styles.description}>Detalles del Evento</p>

        <div className={styles.details}>
          <p><span className={styles.label}>Date:</span> {shortDate}</p>
          <p><span className={styles.label}>Location:</span> {event.event_location}</p>
          <p><span className={styles.label}>Duration:</span> {event.duration_in_minutes} minutes</p>
          <p><span className={styles.label}>Category:</span> {event.category_name}</p>
          <p><span className={styles.label}>Max Assistance:</span> {event.max_assistance} people</p>
        </div>
      </div>

      <EnrollModal isOpen={isModalOpen} onClose={closeModal} eventId={selectedEventId} />

      <Footer />
    </main>
  );
};

export default EventDetails;
