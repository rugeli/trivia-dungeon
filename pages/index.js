import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.landing_page}>
      {/* <p className={styles.text}>It's fun and it's good for you.</p> */}
      <div id={styles.tagline}>
        <div className={styles.visible}>
          <ul>
            <li>It's fun.</li>
            <li>It's relaxing.</li>
            <li>It's good for brain.</li>
          </ul>
        </div>
      </div>
      <Link href="/newGame">
        <button className={styles.btn}>
          <span>New Game</span>
        </button>
      </Link>
    </div>
  );
}

// className={} can let Home.module.css scope each class automatically
