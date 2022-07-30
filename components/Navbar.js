import Link from 'next/link'

const Navbar = () => {
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

export default Navbar;