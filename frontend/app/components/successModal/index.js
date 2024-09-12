import React from 'react';
import styles from './SuccessModal.module.css';

const SuccessModal = ({ onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Sent successfully!</h2>
        <p className={styles.message}>Your message has been sent successfully. We will get in touch with you soon.</p>
        <button className={styles.button} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SuccessModal;
