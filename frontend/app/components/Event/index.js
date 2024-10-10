"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import styles from "./event.module.css";

const Event = ({ event }) => {
  const router = useRouter();
  const shortDate = format(new Date(event.start_date), "dd/MM/yyyy");
  
  const handleDetails = () => {
    sessionStorage.setItem("selectedEvent", JSON.stringify(event));
    router.push(`/details`);
  };

  const handleEnroll = (e) => {
    e.stopPropagation(); 
    router.push("/enroll");
  };

  return (
    <div className={styles.event} onClick={handleDetails}>
      <img src={event.image} alt={event.event_name} className={styles.img} />
      <div>
        <h3 className={styles.h3}>{event.event_name}</h3>
        <p className={styles.p}>{shortDate}</p>
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
