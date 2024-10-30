"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from './page.module.css'
import Footer from "../components/footer";
import { FaEnvelope, FaLock } from "react-icons/fa";  

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/user/login", {
        username, password
      });
      
      if (response.status === 200) {
        const { user, token } = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        localStorage.setItem("id", user.id); 
        router.push('/');
      } else {
        setError(response.data.message || "Error en el login");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Error al iniciar sesión");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Iniciar Sesión</h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <div className={styles.inputContainer}>
          <FaEnvelope className={styles.icon} />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <FaLock className={styles.icon} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>Iniciar Sesión</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
      <div className={styles.footer}>
        <p>¿No tenes una cuenta? <a href="/register">Registrate</a></p>
      </div>
      <Footer />
    </div>
  );
}