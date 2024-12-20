"use client";
import { Inter } from "next/font/google";
import Link from "next/link";
import styles from "./layout.module.css";
import logo from './logo.png';
import Image from "next/image";
import useAuth from "./components/useAuth.js";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import Footer from "./components/footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading]);

  return (
    <html lang="en">
      <body className={styles.body}>
        <nav className={styles.nav}>
          <div className={styles.header}>
            <Link href="/">
              <Image src={logo} alt="logo" className={styles.logo} />
            </Link>
            <Link href="/" className={styles.title}>Eventos</Link>
            <ul className={styles.menu}>
              <li className={styles.menuItem}>
                <Link href="/" className={styles.menuLink}>Home</Link>
              </li>
              <li className={styles.menuItem}>
                <Link href="/contact" className={styles.menuLink}>Contactanos</Link>
              </li>
            </ul>
          </div>
          <Link href="/profile">
            <div className={styles.profile}>
              <span className={styles.profileName}>{"Mi perfil"}</span>
            </div>
          </Link>
        </nav>
        {loading ? <p>Cargando...</p> : children}
      </body>
      <footer>
          <Footer />
        </footer>
    </html>
  );
}
