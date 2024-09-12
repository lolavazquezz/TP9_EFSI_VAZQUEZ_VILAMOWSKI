import React from 'react';
import Events from "./components/Events";
import Footer from "./components/Footer";

const Home = () => {
  const eventsList = [
    { id: '1', name: 'Travis Scott', date: '6/22/2024', image: '/images/travis_scott.jpg' },
    { id: '2', name: 'Miley Cyrus', date: '7/29/2024', image: '/images/miley_cyrus.jpg' },
    { id: '3', name: 'Justin Bieber', date: '5/16/2024', image: '/images/justin_bieber.jpg' },
    { id: '4', name: 'Adele', date: '11/16/2024', image: '/images/adele.jpg' },
    { id: '5', name: 'Bruno Mars', date: '8/10/2024', image: '/images/bruno_mars.jpg' },
    { id: '6', name: 'Ariana Grande', date: '7/25/2024', image: '/images/ariana_grande.jpg' },
  ];

  return (
    <div>
    <Events eventsList={eventsList} />;
    <Footer></Footer>
    </div>
  );
};

export default Home;
