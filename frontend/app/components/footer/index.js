import React from 'react';
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <p>© 2024 Eventos, Inc.</p>
        <a href="/contact" className={styles.contact}>Contactanos</a>
      </footer>
  );
};

export default Footer;
