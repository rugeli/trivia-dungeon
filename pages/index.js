import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.landing_page}>
      <div id={styles.tagline}>
        <div className={styles.visible}>
          <ul>
            <li>It&apos;s fun.</li>
            <li>It&apos;s relaxing.</li>
            <li>It&apos;s good for brain.</li>
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
