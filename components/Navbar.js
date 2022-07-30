import Link from 'next/link'
import { useContext } from 'react'
import AuthContext from '../stores/authContext'

export default function Navbar() {
  const user = useContext(AuthContext)
  console.log(user)

  return ( 
    <nav>
      <div className="logo">
        <h1>
          <Link href="/"><a>Trivia Dungeon</a></Link>
        </h1>
      </div>
      <Link href="/planning"><a>Planning Story</a></Link>
      <Link href="/leaderboard"><a>Leaderboard</a></Link>
      <Link href="/authentication"><a>LogIn/SignUp</a></Link>
    </nav>
  );
}