import { useRouter } from "next/router";
import { useEffect, useMemo, useState, useContext } from "react";
import { decode, decodeEntity } from "html-entities";
import styled from "styled-components";
import Link from "next/link";
import AuthContext from "../../stores/authContext";
import axios from "axios";

const QuizQuestionsWrap = styled.div`
  text-align: center;
  background-color: var(--main-bg-color);
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 132px);
`;
const QuizQuestion = styled.div`
  display: flex;
  flex-flow: column;
  background-color: var(--secondary-bg-color);
  border-radius: 4px;
  padding: 15px;
  .answer_block {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 0;
    flex-wrap: wrap;
  }
`;
const QuizQuestionHeading = styled.h2`
  font-size: 28px;
  margin-bottom: 25px;
  text-align: center;
  @media screen and (max-width: 560px) {
    font-size: 22px;
  }
`;
const QuizQuestionOptionsWrap = styled.div`
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
`;

const QuizQuestionOption = styled.button`
  width: 46%;
  margin: 0 2% 2%;
  border: 2px solid transparent;
  border-radius: 4px;
  transition: all ease 0.2s;
  cursor: pointer;
  background-color: var(--main-bg-color);
  color: var(--main-text-color);
  padding: 10px 15px;
  font-size: 13px;
  white-space: pre-wrap;
  letter-spacing: 0;
  &:hover {
    border-color: var(--main-text-color);
  }
  @media screen and (max-width: 560px) {
    width: 100%;
  }
`;

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
        .put(`http://127.0.0.1:5000/users/${user.id}`, userRecord, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => res.json())
        .catch((error) => console.log("error 1", error));
    }
  };

  const submitAnswer = (answer) => {
    // console.log(">> questions", questions);
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
            <button>Play Again</button>
          </Link>
        </div>
      ) : (
        <QuizQuestionsWrap>
          <header>
            <h2>
              {/* Score: {correctAnswers} / {questions.length} */}
              Score: {correctAnswers}
            </h2>
            <h2>Remaining chances: {lives} / 5 </h2>
          </header>
          {questions?.length > 0 && (
            <div className="wrapper">
              <QuizQuestion>
                <QuizQuestionHeading>
                  {decode(questions[currentQuestion].question)}
                </QuizQuestionHeading>
                <QuizQuestionOptionsWrap>
                  {questions[currentQuestion]["possible_answers"].map(
                    (answer) => (
                      <QuizQuestionOption
                        key={answer}
                        onClick={() => submitAnswer(answer)}
                      >
                        {decode(answer)}
                      </QuizQuestionOption>
                    )
                  )}
                </QuizQuestionOptionsWrap>
              </QuizQuestion>
            </div>
          )}
        </QuizQuestionsWrap>
      )}
    </>
  );
};

export default QuizQuestionScreen;
