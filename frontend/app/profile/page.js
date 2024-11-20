"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from "../components/useAuth.js";
import Link from 'next/link';
import styles from './page.module.css';
import axios from 'axios';

function Profile() {
  const { user, loading, showAuthOptions } = useAuth();
  const router = useRouter();
  const [id, setId] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.id) {
      setId(storedUser.id);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (loading) return <div>Cargando...</div>;

  if (showAuthOptions) {
    return (
      <div className={styles.authOptions}>
        <div className={styles.buttonsContainer}>
          <div className={styles.buttonsTop}>
            <Link href="/login">
              <button className={styles.button}>Iniciar sesión</button>
            </Link>
            <Link href="/register">
              <button className={styles.button}>Registrarse</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className={styles.perfilPage}>
      <div className={styles.profileHeader}>
        <h2>Perfil de usuario</h2>
      </div>

      <div className={styles.options}>
        <div className={styles.option}>
          <span className={styles.label}>Nombre de usuario:</span>
          <span className={styles.value}>{user.username}</span>
        </div>
        <div className={styles.option}>
          <span className={styles.label}>Nombre:</span>
          <span className={styles.value}>{user.first_name}</span>
        </div>
        <div className={styles.option}>
          <span className={styles.label}>Apellido:</span>
          <span className={styles.value}>{user.last_name}</span>
        </div>
      </div>

      <button onClick={handleLogout} className={styles.logoutButton}>
        Cerrar sesión
      </button>
    </main>
  );
}

export default Profile;
