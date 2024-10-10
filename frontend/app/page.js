"use client"
import { useEffect, useState } from 'react';
import React from 'react';
import Events from "./components/events";
import Footer from "./components/footer";
import axios from 'axios';

const Home = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/event"); 
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);
console.log(events);
  return (
    <div>
    <Events events={events} />
    <Footer></Footer>
    </div>
  );
};

export default Home;
