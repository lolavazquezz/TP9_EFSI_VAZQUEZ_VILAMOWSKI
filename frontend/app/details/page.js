"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const EventDetails = ({ eventsList }) => {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("id");
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (eventId) {
      // Buscamos el evento por su ID en la lista de eventos
      const foundEvent = eventsList.find((ev) => ev.id === eventId);
      setEvent(foundEvent);
    }
  }, [eventId, eventsList]);

  if (!event) {
    return <p>Event not found.</p>;
  }

  return (
    <div>
      <h1>{event.name}</h1>
      <img src={event.image} alt={event.name} />
      <p>{event.date}</p>
      <p>{event.description}</p>
    </div>
  );
};

export default EventDetails;
