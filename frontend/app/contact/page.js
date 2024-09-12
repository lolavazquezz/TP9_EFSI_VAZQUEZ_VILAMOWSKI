"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Footer from "../components/footer";
import SuccessModal from "../components/successModal";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
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
      message: "",
    });
    setIsModalOpen(false);
  };

  return (
    <div>
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Contact us</h1>
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
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            className={styles.textarea}
            rows="5"
            required
          ></textarea>
          <button type="submit" className={styles.button}>Send</button>
        </form>
      </main>
      {isModalOpen && <SuccessModal onClose={handleCloseModal} />}
      </div>
      <Footer />
    </div>
  );
}
