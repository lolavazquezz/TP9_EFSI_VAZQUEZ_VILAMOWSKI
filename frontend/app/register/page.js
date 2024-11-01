"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from './page.module.css'
import Footer from "../components/footer";
import { FaEnvelope, FaUser, FaLock } from "react-icons/fa";

export default function Register() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [isChecking, setIsChecking] = useState(false); 
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
  
    setIsChecking(true);
  
    try {
      const response = await axios.get("http://localhost:3000/api/user/usuarios");
  
      const existingUser = response.data.some(
        user => user.username === username
      );
  
      if (existingUser) {
        setError("El correo o el nombre de usuario ya están en uso.");
        setIsChecking(false); 
        return;
      }
      const registerResponse = await axios.post("http://localhost:3000/api/user/register", {
  username, first_name, last_name, password
});
if (registerResponse.status === 201 && Array.isArray(registerResponse.data.answer) && registerResponse.data.answer.length > 0) {
  const user = registerResponse.data.answer[0];
  localStorage.setItem("user", JSON.stringify(user));
  router.push('/login');
} else {
  setError("Error al registrar usuario");
}


  
    } catch (error) {
      console.error("Error durante el registro:", error);
      setError("Error al registrar usuario");
    } finally {
      setIsChecking(false);
    }
  };

  
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Registro</h1>
      </div>
      <form onSubmit={handleRegister} className={styles.form}>
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
          <FaUser className={styles.icon} />
          <input
            type="text"
            placeholder="First name"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <FaUser className={styles.icon} />
          <input
            type="text"
            placeholder="Last name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
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
        <div className={styles.inputContainer}>
          <FaLock className={styles.icon} />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button} disabled={isChecking}>
          {isChecking ? "Verificando..." : "Registrar"}
        </button>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.footer}>
          <p>¿Ya tienes una cuenta? <a href="/login">Log in</a></p>
        </div>
      </form>
      <Footer />
    </div>
  );
}