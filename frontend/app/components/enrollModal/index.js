import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../useAuth.js';
import styles from './enrollModal.module.css';

const EnrollModal = ({ isOpen, onClose, eventId }) => {
    const { user } = useAuth();
    const [description, setDescription] = useState('');
    const [registrationDateTime, setRegistrationDateTime] = useState(new Date().toISOString());
    const [attended, setAttended] = useState(false);
    const [observations, setObservations] = useState('');
    const [rating, setRating] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';  // Evita scroll en el fondo
            document.body.classList.add('modal-open'); // Añade clase para deshabilitar fondo
        } else {
            document.body.style.overflow = 'auto';
            document.body.classList.remove('modal-open');
        }

        return () => {
            document.body.style.overflow = 'auto';
            document.body.classList.remove('modal-open');
        };
    }, [isOpen]);

    const enrollUser = async () => {
        if (!eventId || !user) {
            setMessage('Por favor, selecciona un evento y proporciona tu nombre de usuario.');
            return;
        }

        const enrollmentData = {
            id_event: eventId,
            id_user: user.id,
            description: attended ? description : null,
            registration_date_time: registrationDateTime,
            attended,
            observations: attended ? observations : null,
            rating: attended ? rating : null,
        };

        try {
            const response = await axios.post(`http://localhost:3000/api/event/${eventId}/enrollment/${user.username}`, enrollmentData);
            setMessage(response.data);
            onClose(); 
        } catch (error) {
            console.error("Error enrolling user", error);
            setMessage(error.response?.data || 'Error al inscribirse.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={onClose}>&times;</span>
                <div className={styles.h1}>Inscripción a Eventos</div>
                <div>
                    <div className={styles.label}>Descripción:</div>
                    <input
                        type="text"
                        className={styles.input}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={!attended}
                    />
                </div>
                <div>
                    <div className={styles.label}>Fecha y hora de inscripción:</div>
                    <input
                        type="datetime-local"
                        className={styles.input}
                        value={registrationDateTime.substring(0, 16)}
                        onChange={(e) => setRegistrationDateTime(e.target.value)}
                    />
                </div>
                <div>
                    <label className={styles.label}>
                        <input
                            type="checkbox"
                            checked={attended}
                            onChange={(e) => setAttended(e.target.checked)}
                        />
                        Asistió
                    </label>
                </div>
                <div>
                    <div className={styles.label}>Observaciones:</div>
                    <textarea
                        className={styles.textarea}
                        value={observations}
                        onChange={(e) => setObservations(e.target.value)}
                        disabled={!attended}
                    />
                </div>
                <div>
                    <div className={styles.label}>Calificación:</div>
                    <input
                        type="number"
                        className={styles.numberInput}
                        min="1"
                        max="5"
                        value={rating || ''}
                        onChange={(e) => setRating(e.target.value)}
                        disabled={!attended}
                    />
                </div>
                <button className={styles.button} onClick={enrollUser}>Inscribirse</button>
                {message && <p className={styles.message}>{message}</p>}
            </div>
        </div>
    );
};

export default EnrollModal;
