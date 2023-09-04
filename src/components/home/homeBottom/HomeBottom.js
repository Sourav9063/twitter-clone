import Link from "next/link";
import styles from "./HomeBottom.module.css";
import { useContext } from "react";

export function HomeBottom() {
  return (
    <div className={styles.authBottomBar}>
      <div className={styles.left}>
        <p>*Test using this credentials</p>
        <p>EMAIL: sourav.shellbeehaken@gmail.com PASSWORD: 12345678</p>
      </div>
      <div className={styles.center}>
        <p className={styles.title}>Don’t miss what’s happening</p>
        <p className={styles.subtitle}>
          People on Twitter are the first to know.
        </p>
      </div>
      <div className={styles.right}>
        <Link href="?modal=signin" className={styles.login}>
          Log in
        </Link>
        <Link href="?modal=signup" className={styles.signup}>
          Sign up
        </Link>
      </div>
    </div>
  );
}
