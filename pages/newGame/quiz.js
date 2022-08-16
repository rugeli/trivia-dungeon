import { useRouter } from "next/router";
import { useEffect, useMemo, useState, useContext } from "react";
import { decode } from "html-entities";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import AuthContext from "../../stores/authContext";
import axios from "axios";

const QuizQuestionScreen = () => {
  const { user } = useContext(AuthContext);
  // console.log(`in quiz---`, user);
  const { query } = useRouter();
  // console.log(`category`, query.category);
  const [questions, setQuestions] = useState("");
  const category = useMemo(() => query.category, [query]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [lives, setLives] = useState(5);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isOutQuestion, setIsOutQuestion] = useState(false);
  const [gameEndingMessage, setGameEndingMessage] = useState("");
  const [gameToken, setGameToken] = useState("");

  useEffect(() => {
    fetchToken();
  }, []);

  useEffect(() => {
    if (currentQuestion % 10 === 8) {
      fetchQuestions(gameToken);
    }
  }, [currentQuestion]);

  const fetchToken = () => {
    fetch("https://opentdb.com/api_token.php?command=request")
      .then((res) => res.json())
      .then((data) => {
        console.log("token", data);
        fetchQuestions(data.token);
        setGameToken(data.token);
      });
  };

  const fetchQuestions = (token) => {
    fetch(
      `https://opentdb.com/api.php?amount=10&category=${category}&type=multiple&token=${token}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.response_code === 0) {
          setQuestions([
            ...questions,
            ...data.results.map((result) => ({
              ...result,
              possible_answers: [
                ...result["incorrect_answers"],
                result["correct_answer"],
              ].sort(() => Math.random() - 0.5),
            })),
          ]);
        } else {
          setIsOutQuestion(true);
          setGameEndingMessage("Out of Questions");
          setIsGameOver(true);
        }
      });
  };

  const saveUserRecord = (user) => {
    const userRecord = {
      highest_score: correctAnswers,
      highest_category: category,
    };
    if (user) {
      axios
        .put(
          `https://trivia-dungeon-backend.herokuapp.com/users/${user.id}`,
          userRecord,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((res) => res.json())
        .catch((error) => console.log("error 1", error));
    }
  };

  const submitAnswer = (answer) => {
    console.log(">> questions", questions);
    let localLives = lives;
    if (answer === questions[currentQuestion]["correct_answer"]) {
      setCorrectAnswers(correctAnswers + 1);
    } else {
      localLives = localLives - 1;
      setLives(localLives);
      setIsGameOver(localLives === 0);
    }

    if (localLives > 0) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      saveUserRecord(user);
    }

    setLives(localLives);
  };

  return (
    <>
      {isGameOver ? (
        <div>
          {!isOutQuestion ? (
            <h2>Game over ! Final score: {correctAnswers}</h2>
          ) : (
            <h2>{gameEndingMessage}</h2>
          )}
          {user && <h3>Record has been successfully updated.</h3>}
          <Link href="/">
            <button className={styles.btn2}>Play Again</button>
          </Link>
        </div>
      ) : (
        <div className={styles.question_wrap}>
          <header>
            <h2>
              {/* Score: {correctAnswers} / {questions.length} */}
              Score: {correctAnswers}
            </h2>
            <h2>Remaining chances: {lives} / 5 </h2>
          </header>
          {questions?.length > 0 && (
            <div className="wrapper">
              <div className={styles.question_body}>
                <h2 className={styles.question_text}>
                  {decode(questions[currentQuestion].question)}
                </h2>
                <div className={styles.options_wrap}>
                  {questions[currentQuestion]["possible_answers"].map(
                    (answer) => (
                      <button
                        className={styles.option_btn}
                        key={answer}
                        onClick={() => submitAnswer(answer)}
                      >
                        {decode(answer)}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default QuizQuestionScreen;
