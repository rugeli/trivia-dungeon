import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div> 
      <h1 className={styles.title}>Homepage</h1>
      <p className={styles.text}>This is the homepage</p>
      <Link href="/newGame">
        <a className={styles.btn}>New Game</a>
      </Link>
    </div>
  )
}

// className={} can let Home.module.css scope each class automatically
