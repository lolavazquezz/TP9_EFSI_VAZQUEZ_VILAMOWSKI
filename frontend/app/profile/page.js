import React from 'react';
import Footer from "../components/footer";
import styles from './page.module.css'; // Asumiendo que tendrás un archivo CSS para estilos

const Profile = () => {
  // Simulamos datos del usuario para mostrar
  const user = {
    name: "Leila Shepard",
    email: "leila@shepard.com",
    profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK6XIfvGfED4TE4VgnFI6esbcVb2NCidLC6Zwu1K7iACEK4SfrS-n8E6R2jDBjS6J3qX4&usqp=CAU"
  };

  return (
    <div>
    <div className={styles.profileContainer}>
      <header className={styles.profileHeader}>
        <h1>Profile</h1>
      </header>

      <section className={styles.profileDetails}>
        <div className={styles.profileImageContainer}>
          <img src={user.profileImage} alt="Profile" className={styles.profileImage} />
        </div>
        <div className={styles.userInfo}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      </section>

      <section className={styles.profileActions}>
        <button className={styles.editProfileButton}>Log out</button>
      </section>
    </div>
      <Footer className={styles.footer}/>
    </div>
  );
};

export default Profile;
