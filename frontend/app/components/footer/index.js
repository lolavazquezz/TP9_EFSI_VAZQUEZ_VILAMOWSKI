import React from 'react';
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <p>© 2024 Events, Inc.</p>
        <a href="/contact" className={styles.contact}>Contact</a>
      </footer>
  );
};

export default Footer;
