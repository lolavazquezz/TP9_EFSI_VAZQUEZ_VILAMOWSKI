"use client";
import React, { useEffect, useState } from 'react'; 
import { useRouter } from 'next/navigation'; 
import styles from './page.module.css';
import Footer from "../components/footer";
import { format } from "date-fns";
import EnrollModal from '../components/enrollModal'; // Asegúrate de la ruta correcta

const EventDetails = () => {
  const router = useRouter();
  const [event, setEvent] = useState(null); 
  const [shortDate, setShortDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!event) return null;

  return (
    <main className={styles.mainContent}>
      <a href="/" className={styles.back}>← Events</a>
      <h1 className={styles.eventTitle}>{event.event_name}</h1>
      <div className={styles.detailsContent}>
        <div className={styles.detailsContainer}>
          <p className={styles.date}>{shortDate}</p>
          <p className={styles.description}>{event.description}</p>
          <button onClick={openModal} className={styles.enrollbutton}>Inscribirse</button>
        </div>
      </div>
      <EnrollModal isOpen={isModalOpen} onClose={closeModal} eventId={event.id} />
      <Footer />
    </main>
  );
};

export default EventDetails;
