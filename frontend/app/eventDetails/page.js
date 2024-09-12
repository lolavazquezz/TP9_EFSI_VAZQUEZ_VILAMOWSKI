import React from 'react';
import { useRouter } from 'next/router';
//import styles from "./page.module.css";


const eventsData = [
  { id: '1', name: 'Travis Scott', date: '6/22/2024', details: 'Event details about Travis Scott' },
  { id: '2', name: 'Miley Cyrus', date: '7/29/2024', details: 'Event details about Miley Cyrus' },
];

const EventDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const event = eventsData.find(event => event.id === id);

  if (!event) return <div>Loading...</div>;

  return (
    <div className="event-details">
      <h1>{event.name}</h1>
      <p>Date: {event.date}</p>
      <p>{event.details}</p>
    </div>
  );
};

export default EventDetails;
