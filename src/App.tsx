import React, { MouseEvent, useEffect, useState } from 'react';
import { GlobalStyle, Wrapper } from './App.styles';
import QuestionCard from './components/QuestionCard';
import { TOTAL_NUMBER } from './utils';
import { fetchCategories, fetchQuestions } from './API';

export type QuestionType = {
  question: string,
  answers: string[],
  correctAnswer: string
}


export type Category = {
  id: number | string,
  name: string
}

function App() {
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [questionNum, setQuestionNum] = useState(0)
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(false)
  const [userAnswer, setUserAnswer] = useState<string | undefined>('')
  const [gameOver, setGameOver] = useState(true)
  const [categories, setCategories] = useState<Category[]>([{id: '', name: 'Any Category'}])
  const [category, setCategory] = useState('')
  const [difficulty, setDifficulty] = useState('')

  useEffect(() => {

    const handleCategories = async () => {
      const fetchedCategories = await fetchCategories()

      if (fetchedCategories) {
        setCategories(categories => [...categories, ...fetchedCategories])
      }
    }

    handleCategories()

  }, [])

  const startTrivia = async (): Promise<void> => {
    setScore(0)
    setQuestionNum(0)
    setUserAnswer('')

    setLoading(true)
    const formattedQuestions = await fetchQuestions(category, difficulty)

    if (formattedQuestions) {
      setQuestions(formattedQuestions);
      setGameOver(false)
    }

    setLoading(false)
  };

  const checkAnswer = (e: MouseEvent<HTMLButtonElement>) => {
    const selectedAnswer = e.currentTarget.dataset.value ?? '';
    setUserAnswer(selectedAnswer);

    const correctAnswer = questions[questionNum].correctAnswer;
    if (selectedAnswer === correctAnswer) {
      setScore(score => score + 1);
    }
  };


  const nextQuestion = () => {
    if (questionNum + 1 >= TOTAL_NUMBER) {
      setGameOver(true)
    } else {
      setQuestionNum(questionNum => questionNum + 1)
      setUserAnswer('')
    }
  }
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>React Quiz</h1>
        {gameOver && !loading && categories && (
          <div className='settings'>
            <select className='select' onChange={(e) => setCategory(e.target.value)}>
              {
                categories.map(c => {
                  return <option value={c.id}>{c.name}</option>
                })
              }
            </select>
            <select className='select' onChange={(e) => setDifficulty(e.target.value)}>
              <option value=''>Any</option>
              <option value='easy'>Easy</option>
              <option value='medium'>Medium</option>
              <option value='hard'>Hard</option>
            </select></div>
        )}
        {gameOver && !loading && questionNum !== 0 && <p className="score">Score: {score}</p>}
        {gameOver && !loading && <button className='start' onClick={startTrivia}>New Game</button>}
        {loading && <p>Loading questions...</p>}


        {
          !gameOver && !loading &&
          <QuestionCard key={questions[questionNum].question} question={questions[questionNum]} questionNum={questionNum} checkAnswer={checkAnswer} userAnswer={userAnswer} />
        }
        {!gameOver && !loading &&
          <button className="next" onClick={nextQuestion}>{questionNum + 1 === TOTAL_NUMBER ? 'Finish the Game' : 'Next Question'}</button>}
      </Wrapper>
    </>
  );
}

export default App;
