import styles from "./page.module.css";
import Footer from "../components/footer";

export default function Register() {
  return (
    <div>
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Create account</h1>
        <form className={styles.form}>
          <input type="text" placeholder="Full Name" className={styles.input} />
          <input type="text" placeholder="Last Name" className={styles.input} />
          <input type="text" placeholder="Username" className={styles.input} />
          <input type="password" placeholder="Password" className={styles.input} />
          <input type="password" placeholder="Confirm Password" className={styles.input} />
          <div className={styles.buttonContainer}>
            <a href="/login" type="button" className={styles.button}>Sign in</a>
            <a href="/" type="submit" className={styles.button}>Next</a>
          </div>
        </form>
      </main>
    </div>
    <Footer></Footer>
    </div>
  );
}
