import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHandBackPointRight} from "@fortawesome/free-solid-svg-icons"

const Planning = () => {
  return ( 
    <div>
      <h1>Planning Story</h1>
      <p>
        Welcome to My first ever full-stack project, The Trivia Dungeon. In creating the project, I have utilized the skill and knowledge I acquired from Ada Developers Academy and a broad spectrum of research. As a result, I was able to understand my own potential and limitations. It truly is a pioneer project for me to explore the possibilities of full-stack development. 
      </p>
      <p>
        The back story of designing this game is that my family can enjoy it together. In the game, each one of us can choose a favorite category to play. And by signing up, each player gets to save the score. In addition, there is a leaderboard where players can race for the top spot.
      </p>
      <p>
        Big thanks to the API <FontAwesomeIcon icon={faHandBackPointRight}></FontAwesomeIcon> <a href="https://opentdb.com/" target="_blank" rel="noreferrer">Open Trivia Database</a>
      </p>
    </div>
  );
}

export default Planning;