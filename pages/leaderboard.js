import { useEffect, useState } from "react";
import axios from "axios";
import categories from "../utils/categories";

const Leaderboard = () => {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/users/leader/board`)
      .then((res) => setBoard(res.data))
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            {/* <th>Email</th> */}
            <th>Score</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {board.length > 0 ? (
            board.map((user, index) => (
              <tr key={user.email}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                {/* <td>{user.email}</td> */}
                <td>{user.high_score}</td>
                <td>{categories[user.category]?.title || "--"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No players yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
