import Link from "next/link";
// import Image from "next/image";
import { useContext } from "react";
import AuthContext from "../stores/authContext";

export default function Navbar() {
  const { user, login, logout, authReady } = useContext(AuthContext);

  return (
    <div>
      <nav>
        {/* <Image src="/blue.png" alt="icon" width={50} height={50}/> */}
        <div className="logo">
          <h1>
            <Link href="/">
              <a>Trivia Ocean</a>
            </Link>
          </h1>
        </div>
        {authReady && (
          <ul>
            <li>
              <Link href="/planning">
                <a>Planning Story</a>
              </Link>
            </li>
            <li>
              <Link href="/leaderboard">
                <a>Leaderboard</a>
              </Link>
            </li>
            {!user && (
              <li onClick={login} className="btn">
                LogIn/SignUp
              </li>
            )}
            {user && (
              <li onClick={logout} className="btn">
                Log out
              </li>
            )}
          </ul>
        )}
      </nav>
      {user && <h2 className="username">Hi! {user.user_metadata.full_name}</h2>}
    </div>
  );
}
