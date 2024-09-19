"use client"
import React from 'react';
import { useRouter } from 'next/navigation'; // Importa useRouter para la navegación
import styles from './page.module.css';
import Footer from "../components/footer";

const EventDetails = () => {
  const router = useRouter();

  const handleEnroll = (e) => {
    router.push("/enroll");
  };

  return (
      <main className={styles.mainContent}>
        <a href="/" className={styles.back}>← Events</a>
        <h1 className={styles.eventTitle}>Travis Scott</h1>

        <div className={styles.eventImagePlaceholder}>
          <img src='https://media.npr.org/assets/img/2021/11/16/gettyimages-1235223332_sq-e88ad790d447bd7dfcb0c1571047db26d39a8ee0.jpg'/>
        </div>

        <div className={styles.detailsContent}>
          <div className={styles.priceEnroll}>
            <span className={styles.price}>Price: $120</span>
            <button onClick={handleEnroll} className={styles.enrollButton}>
          Enroll
        </button>
                  </div>

          <p className={styles.description}>Description</p>

          <div className={styles.details}>
            <p>Date: 12/12/2024</p>
            <p>Location: River Plate Stadium</p>
            <p>Tag: Rap Music</p>
            <p>Duration: 120 minutes</p>
            <p>Category: Concert</p>
            <p>Max Assistance: 20,000 people</p>
          </div>
        </div>
        <Footer />
      </main>
  );
};

export default EventDetails;
