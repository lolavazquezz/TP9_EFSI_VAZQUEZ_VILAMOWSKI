"use client"
import { Inter } from "next/font/google";
import Link from "next/link";
import styles from "./layout.module.css";
import logo from './logo.png';
import Image from "next/image";
import useAuth from "./components/useAuth.js";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Events"
// };

export default function RootLayout({ children }) {
  const { user } = useAuth();
  const router = useRouter();
  const [id, setId] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.id) {
      setId(storedUser.id);
    }
  }, []);
  return (
    <html lang="en">
      <body className={styles.body}>
        <nav className={styles.nav}>
          <div className={styles.header}>
            <Link href="/">
              <Image src={logo} alt="logo" className={styles.logo} />
            </Link>
            <Link href="/" className={styles.title}>Events</Link>
            <ul className={styles.menu}>
              <li className={styles.menuItem}>
                <Link href="/" className={styles.menuLink}>Home</Link>
              </li>
              <li className={styles.menuItem}>
                <Link href="/contact" className={styles.menuLink}>Contact</Link>
              </li>
            </ul>
          </div>
          <Link href="/profile">
          <div className={styles.profile}>
            <span className={styles.profileName}>{user.first_name}</span>
          </div>
          </Link>

        </nav>
        {children}
      </body>
    </html>
  );
}
