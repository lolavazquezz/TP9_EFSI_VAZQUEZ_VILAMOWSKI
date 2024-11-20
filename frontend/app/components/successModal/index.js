import React from 'react';
import styles from './successModal.module.css';

const SuccessModal = ({ onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>¡Enviado satisfactoriamente!</h2>
        <p className={styles.message}>Tu solicitud ha sido enviada con éxito.</p>
        <button className={styles.button} onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default SuccessModal;
