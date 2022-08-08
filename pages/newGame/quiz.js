import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Link from 'next/link'

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
  const { query } = useRouter();
  console.log(`category`, query.category);
  const [questions, setQuestions] = useState("");
  // const [status, setStatus] = useState("fetching");
  const category = useMemo(() => query.category, [query]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [lives, setLives] = useState(3);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(fetchQuestions, [category]);
  useEffect(() => {
    if (currentQuestion % 10 === 8) {
      fetchQuestions();
    }
  }, [currentQuestion]);

  function fetchQuestions() {
    fetch(
      `https://opentdb.com/api.php?amount=10&category=${category}&type=multiple`
    )
      .then((res) => res.json())
      .then((data) => {
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
      });
  }

  const submitAnswer = (answer) => {
    if (answer === questions[currentQuestion]["correct_answer"]) {
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setLives(lives - 1);
      setIsGameOver(lives - 1 === 0);
    }
    if (!isGameOver) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  if (isGameOver) {
    return (
      <div>
        <h2>
          Game over ! Final score: {correctAnswers} / {questions.length}
        </h2>
        <p>Go back to the <Link href="/"><button>Homepage</button></Link></p>
      </div>
    );
  }
  // console.log(">> questions", questions);
  return (
    <QuizQuestionsWrap>
      {questions?.length > 0 && (
        <div className="wrapper">
          <QuizQuestion>
            
              <h2>
                Score: {correctAnswers} / {questions.length}
              </h2>
              <h2>Remaining: {lives}</h2>
            <QuizQuestionHeading>
              <h3>{questions[currentQuestion].question}</h3>
            </QuizQuestionHeading>
            <QuizQuestionOptionsWrap>
              {questions[currentQuestion]["possible_answers"].map((answer) => (
                <QuizQuestionOption key={answer} onClick={() => submitAnswer(answer)}>
                  {answer}
                </QuizQuestionOption>
              ))}
            </QuizQuestionOptionsWrap>
          </QuizQuestion>
        </div>
      )}
    </QuizQuestionsWrap>
  );
};

export default QuizQuestionScreen;
