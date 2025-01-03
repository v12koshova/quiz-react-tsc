import React, { MouseEvent } from 'react'
import { QuestionType, TOTAL_NUMBER } from '../utils'
import { ButtonWrapper, Wrapper } from './QuestionCard.styles'

type PropsType = {
    question: QuestionType,
    checkAnswer: (e: MouseEvent<HTMLButtonElement>) => void,
    questionNum: number,
    userAnswer: string | undefined
}

function QuestionCard({ question, checkAnswer, questionNum, userAnswer }: PropsType) {
    return (
        <Wrapper>
            <div>QuestionCard: {questionNum + 1} / {TOTAL_NUMBER}</div>
            <h2><span dangerouslySetInnerHTML={{ __html: question.question }} /></h2>
            <div className="answers">
                {
                    question.answers.map(answer => (
                        <ButtonWrapper key={answer}
                            $correct={!!userAnswer?.length && question.correctAnswer === answer}
                            $userClicked={userAnswer === answer}
                        >
                            <button disabled={!!userAnswer?.length} data-value={answer} onClick={checkAnswer}><span dangerouslySetInnerHTML={{ __html: answer }} /></button>
                        </ButtonWrapper>
                    ))
                }
            </div>
        </Wrapper>
    )
}

export default QuestionCard