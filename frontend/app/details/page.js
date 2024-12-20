"use client";
import React, { useEffect, useState } from 'react'; 
import { useRouter } from 'next/navigation'; 
import styles from './page.module.css';
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
      <a href="/" className={styles.back}>← Eventos</a>
      <h1 className={styles.eventTitle}>{event.event_name}</h1>

      <div className={styles.detailsContent}>
        <div className={styles.priceEnroll}>
          <span className={styles.price}>${event.price}</span>
          <button onClick={() => onEnroll(event.id)} className={styles.enrollbutton}>
            Inscribirse
          </button>
        </div>

        <p className={styles.description}>Detalles del evento</p>

        <div className={styles.details}>
          <p><span className={styles.label}>Fecha:</span> {shortDate}</p>
          <p><span className={styles.label}>Ubicación:</span> {event.event_location}</p>
          <p><span className={styles.label}>Duración:</span> {event.duration_in_minutes} minutos</p>
          <p><span className={styles.label}>Categoría:</span> {event.category_name}</p>
          <p><span className={styles.label}>Capacidad máxima:</span> {event.max_assistance} personas</p>
        </div>
      </div>

      <EnrollModal isOpen={isModalOpen} onClose={closeModal} eventId={selectedEventId} />
    </main>
  );
};

export default EventDetails;
