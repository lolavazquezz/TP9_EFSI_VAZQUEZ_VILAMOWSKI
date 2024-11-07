"use client";
import React, { useState } from "react"; // Importa useState
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import styles from "./event.module.css";
import EnrollModal from "../enrollModal";

const Event = ({ event }) => {
  const router = useRouter();
  const shortDate = format(new Date(event.start_date), "dd/MM/yyyy");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  
  const handleDetails = () => {
    sessionStorage.setItem("selectedEvent", JSON.stringify(event));
    router.push(`/details`);
  };

  const onEnroll = (eventId) => {
    setSelectedEventId(eventId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEventId(null);
  };

  return (
    <div className={styles.event}>
      <div onClick={handleDetails}>
        <h3 className={styles.h3}>{event.event_name}</h3>
        <p className={styles.p}>{shortDate}</p>
      </div>
      <div className={styles.content}>
        <button onClick={() => onEnroll(event.id)} className={styles.enrollbutton}>
          Enroll
        </button>
        <button onClick={handleDetails} className={styles.detailsbutton}>
          Details
        </button>
      </div>
      <EnrollModal isOpen={isModalOpen} onClose={closeModal} eventId={selectedEventId} />
    </div>
  );
};

export default Event;
