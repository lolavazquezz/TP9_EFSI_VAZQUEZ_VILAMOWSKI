"use client"
import React from 'react';
import { useState } from "react";
import styles from './page.module.css';
import Footer from "../components/footer";
import SuccessModal from "../components/successModal";


const enroll = () => {
  
    const [formData, setFormData] = useState({
        name: "",
        email: "",
      });
      const [isModalOpen, setIsModalOpen] = useState(false);
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setFormData({
          name: "",
          email: "",
        });
        setIsModalOpen(false);
      };
    
      return (
        <div>
        <div className={styles.page}>
          <main className={styles.main}>
            <h1 className={styles.title}>Enroll</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className={styles.input}
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={styles.input}
                required
              />
              <button type="submit" className={styles.button}>Send</button>
            </form>
          </main>
          {isModalOpen && <SuccessModal onClose={handleCloseModal} />}
          </div>
          <Footer />
        </div>
      );
};

export default enroll;
