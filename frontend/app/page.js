import React from 'react';
import Events from "./components/events";
import Footer from "./components/footer";

const Home = () => {
  const eventsList = [
    { id: '1', name: 'Travis Scott', date: '6/22/2024', image: 'https://media.npr.org/assets/img/2021/11/16/gettyimages-1235223332_sq-e88ad790d447bd7dfcb0c1571047db26d39a8ee0.jpg' },
    { id: '2', name: 'Miley Cyrus', date: '7/29/2024', image: 'https://www.parati.com.ar/wp-content/uploads/2023/05/PLANTILLA-PORTADA-14-749x561.jpg.webp?v=1683158072' },
    { id: '3', name: 'Justin Bieber', date: '5/16/2024', image: 'https://i2.wp.com/hips.hearstapps.com/hmg-prod/images/justin-bieber-gettyimages-1202421980.jpg?resize=1200:*' },
    { id: '4', name: 'Adele', date: '11/16/2024', image: 'https://www.billboard.com/wp-content/uploads/2024/07/adele-las-vegas-residency-2022-billboard-espanol-1548.jpg' },
    { id: '5', name: 'Bruno Mars', date: '8/10/2024', image: 'https://i.scdn.co/image/63cad86cb183568085a4e5f0be86aa187cc511e4' },
    { id: '6', name: 'Ariana Grande', date: '7/25/2024', image: 'https://media.revistavanityfair.es/photos/60e84e19a9295aeb634d0818/master/w_1600%2Cc_limit/28454.jpg' },
  ];

  return (
    <div>
    <Events eventsList={eventsList} />
    <Footer></Footer>
    </div>
  );
};

export default Home;
