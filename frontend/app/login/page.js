import styles from "./page.module.css";
import Footer from "../components/footer";

export default function LogIn() {
  return (
    <div>
    <div className={styles.page}>
      <main className={styles.main}>
          <h2 className={styles.title}>Sign in</h2> 
          <form className={styles.form}>
            <input type="text" placeholder="Username" className={styles.input} />
            <input type="password" placeholder="Password" className={styles.input} />
            <a href="#" className={styles.password}>Forgot password?</a> 
            <div className={styles.buttonContainer}>
              <a href="/register" type="button" className={styles.button}>Create account</a> 
              <a href="/" type="submit" className={styles.button}>Next</a> 
            </div>
          </form>
      </main>
      </div>
      <Footer className={styles.footer}/>
      </div>
  );
}
