import Link from 'next/link'
import { useContext } from 'react'
import AuthContext from '../stores/authContext'

export default function Navbar() {
  const { user, login, logout } = useContext(AuthContext)
  console.log(user)

  return ( 
    <nav>
      <div className="logo">
        <h1>
          <Link href="/"><a>Trivia Dungeon</a></Link>
        </h1>
      </div>
      <ul>
        <li><Link href="/planning"><a>Planning Story</a></Link></li>
        <li><Link href="/leaderboard"><a>Leaderboard</a></Link></li>
        {!user && <li onClick={login} className="btn">LogIn/SignUp</li>}
        {user && <li>Hi! {user.user_metadata.full_name}</li>}
        {user && <li onClick={logout} className="btn">Log out</li>}
      </ul>
    </nav>
  );
}