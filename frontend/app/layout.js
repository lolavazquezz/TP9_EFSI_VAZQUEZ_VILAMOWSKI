import { Inter } from "next/font/google";
import Link from "next/link";
import styles from "./layout.module.css";
import logo from './logo.png';
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Events"
};

export default function RootLayout({ children }) {
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
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK6XIfvGfED4TE4VgnFI6esbcVb2NCidLC6Zwu1K7iACEK4SfrS-n8E6R2jDBjS6J3qX4&usqp=CAU' alt="profile" className={styles.profilePhoto} />
            <span className={styles.profileName}>Leila Shepard</span>
          </div>
          </Link>

        </nav>
        {children}
      </body>
    </html>
  );
}
