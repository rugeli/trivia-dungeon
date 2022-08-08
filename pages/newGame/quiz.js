import {useEffect, useState} from "react";
import styled from 'styled-components';
import categories from '../../utils/categories';

const QuizQuestionsWrap = styled.div`
    text-align: center;
    background-color: var(--main-bg-color);
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 132px);
`
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
`
const QuizQuestionHeading = styled.h2`
    font-size: 28px;
    margin-bottom: 25px;
    text-align: center;
    @media screen and (max-width:560px) {
      font-size: 22px;
    }
`
const QuizQuestionOptionsWrap = styled.div`
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
`

const QuizQuestionOption = styled.button`
    width: 46%;
    margin: 0 2% 2%;
    border: 2px solid transparent;
    border-radius: 4px;
    transition: all ease 0.2s;
    cursor: pointer;
    background-color: var(--main-bg-color);
    color:  var(--main-text-color);
    padding: 10px 15px;
    font-size: 13px;
    white-space: pre-wrap;
    letter-spacing: 0;
    &:hover {
        border-color: var(--main-text-color);
    }
    @media screen and (max-width:560px) {
      width: 100%;
    }
`

const QuizQuestionScreen = (props) => {
  console.log(`props in question screen`,props)
  const category = props.category.split(':')[1];
  const [Questions, setQuestions] = useState('');
  // const [currentQuestion, setcurrentQuestion] = useState(0);
  // const [correctAnswer, setcorrectAnswer] = useState(0);
  const [status, setStatus] = useState('fetching');
  // const [quizzes, setQuizzes] = useLocalStorage('quizzes', '', additionQUIZ);

  useEffect( ()=> {
    fetch( `https://opentdb.com/api.php?amount=10&category=${category}&type=multiple` )
    .then( (res) => {
        if (!res.ok) {
            setStatus('error');
        }
        return res;
    })
    .then( (res) => res.json())
    .then( (data) => {
        setQuestions(data.results);
        setStatus('resolved');
    })
    .catch((error) => {
        setStatus('error');
    });
}, [category]);
}

export default QuizQuestionScreen;