"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../useAuth.js'; // Ajusta la importación según tu estructura

const EnrollModal = ({ isOpen, onClose, eventId }) => {
    const { user } = useAuth();
    const [description, setDescription] = useState('');
    const [registrationDateTime, setRegistrationDateTime] = useState(new Date().toISOString());
    const [attended, setAttended] = useState(false);
    const [observations, setObservations] = useState('');
    const [rating, setRating] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!eventId) {
            setMessage('Esperando el ID del evento...');
        }
    }, [eventId]);

    const enrollUser = async () => {
        if (!eventId || !user) {
            setMessage('Por favor, selecciona un evento y proporciona tu nombre de usuario.');
            return;
        }

        const enrollmentData = {
            id_event: eventId,
            id_user: user.id,
            description,
            registration_date_time: registrationDateTime,
            attended,
            observations,
            rating
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
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h1>Inscripción a Eventos</h1>
                <div>
                    <label htmlFor="description">Descripción:</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="registration-date-time">Fecha y hora de inscripción:</label>
                    <input
                        type="datetime-local"
                        id="registration-date-time"
                        value={registrationDateTime.substring(0, 16)}
                        onChange={(e) => setRegistrationDateTime(e.target.value)}
                    />
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={attended}
                            onChange={(e) => setAttended(e.target.checked)}
                        />
                        Asistió
                    </label>
                </div>
                <div>
                    <label htmlFor="observations">Observaciones:</label>
                    <textarea
                        id="observations"
                        value={observations}
                        onChange={(e) => setObservations(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="rating">Calificación:</label>
                    <input
                        type="number"
                        id="rating"
                        min="1"
                        max="5"
                        value={rating || ''}
                        onChange={(e) => setRating(e.target.value)}
                    />
                </div>
                <button onClick={enrollUser}>Inscribirse</button>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default EnrollModal;
