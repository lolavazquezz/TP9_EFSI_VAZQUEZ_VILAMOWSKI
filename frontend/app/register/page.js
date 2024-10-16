"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Footer from "../components/footer";

export default function Register() {
  const [formData, setFormData] = useState({
    full_name: "",
    last_name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.confirmPassword) {
      return setError("Las contraseñas no coinciden");
    }
    try {
      const response = await axios.post("http://localhost:3000/api/user/register", formData);
      router.push("/login");
    } catch (error) {
      setError("Error en el registro: " + error.response?.data?.message || "Error del servidor");
    }
  };

  return (
    <div>
      <div className={styles.page}>
        <main className={styles.main}>
          <h1 className={styles.title}>Create account</h1>
          <form className={styles.form} onSubmit={handleRegister}>
            <input onChange={handleChange} name="full_name" type="text" placeholder="Full Name" value={formData.full_name} className={styles.input} />
            <input onChange={handleChange} name="last_name" type="text" placeholder="Last Name" value={formData.last_name} className={styles.input} />
            <input onChange={handleChange} name="username" type="text" placeholder="Username" value={formData.username} className={styles.input} />
            <input onChange={handleChange} name="password" type="password" placeholder="Password" value={formData.password} className={styles.input} />
            <input onChange={handleChange} name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} className={styles.input} />
            <div className={styles.buttonContainer}>
              <a href="/login" className={styles.button}>Sign in</a>
              <button type="submit" className={styles.button}>Next</button>
            </div>
          </form>
          {error && <p className={styles.error}>{error}</p>}
        </main>
      </div>
      <Footer />
    </div>
  );
}
