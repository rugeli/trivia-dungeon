import Link from 'next/link';
import styles from '../styles/Home.module.css'

const QuizItem = (props) => {
    // console.log(`in quizItem`, props)
    return(
        <div className={styles.quiz_item}>
            <h3 dangerouslySetInnerHTML={{__html: props.title}} />
            <Link href={{ pathname: '/newGame/quiz', query: { category: JSON.stringify(props.categoryId) } }}>
                <a className={styles.btn1}><span>Go!</span><span>Take Quiz</span></a>
            </Link>

        </div>
    )
}

export default QuizItem