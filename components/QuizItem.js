import Link from 'next/link';
import styled from 'styled-components';
import Button from './Button';

const QuizItemWrap = styled.div`
    background-color: var(--secondary-bg-color);
    padding: 20px;
    text-align: center;
    border-radius: 4px;
    img {
        max-width: 100px;
        height: auto;
        margin-bottom: 20px;
    }
    h3 {
        font-size: 18px;
        min-height: 36px;
    }
    p {
        min-height: 68px;
    }
    .cta-button {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
    }
`

const QuizItem = (props) => {
    console.log(`in quizItem`, props)
    return(
        <QuizItemWrap>
            <h3 dangerouslySetInnerHTML={{__html: props.title}} />
            {/* <Link to={props.ctaLink} className="cta-button">
              <a>
                <Button Label={props.ctaText ? props.ctaText : 'Take Quiz'} />
              </a>
            </Link> */}
        </QuizItemWrap>
    )
}

export default QuizItem