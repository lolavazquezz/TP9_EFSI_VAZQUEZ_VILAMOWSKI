"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "./event.module.css";

const Event = ({ event }) => {
  const router = useRouter();

  const handleDetails = () => {
    // Navegamos a /details pasando el ID del evento como parámetro en la URL
    router.push(`/details`);
  };

  const handleEnroll = (e) => {
    e.stopPropagation(); // Evita la propagación del evento para que no se active handleDetails
    router.push("/enroll");
  };

  return (
    <div className={styles.event} onClick={handleDetails}>
      <img src={event.image} alt={event.name} className={styles.img} />
      <div>
        <h3 className={styles.h3}>{event.name}</h3>
        <p className={styles.p}>{event.date}</p>
      </div>
      <div className={styles.content}>
        <button onClick={handleEnroll} className={styles.enrollbutton}>
          Enroll
        </button>
        <button onClick={handleDetails} className={styles.detailsbutton}>
          Details
        </button>
      </div>
    </div>
  );
};

export default Event;
