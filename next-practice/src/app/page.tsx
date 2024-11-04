import styles from "./page.module.css";
import LoginBtn from "./login/LoginBtn";

export default async function Home() {
  return (
    <div className={styles.page}>
      <LoginBtn />
    </div>
  );
}
