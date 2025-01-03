import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { GlobalStyle, Wrapper } from './App.styles';
import QuestionCard from './components/QuestionCard';
import { Category, QuestionType, TOTAL_NUMBER } from './utils';
import { fetchCategories, fetchQuestions } from './API';

function App() {
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [questionNum, setQuestionNum] = useState(0)
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(false)
  const [userAnswer, setUserAnswer] = useState<string | undefined>('')
  const [gameOver, setGameOver] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [category, setCategory] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [error, setError] = useState('')

  const newGameBtn = useRef<HTMLButtonElement | null>(null);

  const disableBtn5Sec = () => {
    if (newGameBtn.current) {
      newGameBtn.current.disabled = true

      setTimeout(() => {
        if (newGameBtn.current) {
          newGameBtn.current.disabled = false
        }
      }, 5000)
    }
  }

  useEffect(() => {
    if (!!error) {
      disableBtn5Sec()
    }
  }, [error])

  useEffect(() => {
    const baseCategory = { id: '', name: 'Any Category' }
    const handleCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories()
        setCategories([baseCategory, ...fetchedCategories])
      } catch {
        setError('Failed to load categories');
      }
    }

    handleCategories()
  }, [])


  const resetGame = () => {
    setScore(0);
    setQuestionNum(0);
    setUserAnswer('');
    setError('');
  };


  const startTrivia = async () => {
    resetGame();
    setLoading(true);

    try {
      const fetchedQuestions = await fetchQuestions(category, difficulty);
      if (fetchedQuestions && fetchedQuestions.length === TOTAL_NUMBER) {
        setQuestions(fetchedQuestions);
        setGameOver(false);
      } else {
        setError('Choose another category or difficulty.');
        setCategory('');
        setDifficulty('');
      }
    } catch {
      setError('Failed to load questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  const checkAnswer = (e: MouseEvent<HTMLButtonElement>) => {
    const selectedAnswer = e.currentTarget.dataset.value ?? '';
    setUserAnswer(selectedAnswer);

    if (selectedAnswer === questions[questionNum].correctAnswer) {
      setScore(score => score + 1);
    }
  };


  const nextQuestion = () => {
    if (questionNum + 1 >= TOTAL_NUMBER) {
      setGameOver(true)
      setCategory('')
      setDifficulty('')
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
        {error && <p className='error'>{error}</p>}
        {gameOver && !loading && categories && (
          <div className='settings'>
            <select className='select' onChange={(e) => setCategory(e.target.value)}>
              {
                categories.map(c => {
                  return <option key={c.id} value={c.id}>{c.name}</option>
                })
              }
            </select>
            <select className='select' onChange={(e) => setDifficulty(e.target.value)}>
              <option value=''>Any Difficulty</option>
              <option value='easy'>Easy</option>
              <option value='medium'>Medium</option>
              <option value='hard'>Hard</option>
            </select></div>
        )}

        {gameOver && !loading && questionNum !== 0 && <p className="score">Score: {score}</p>}

        {
          gameOver && !loading && (
          <button 
            className='start' 
            ref={newGameBtn}
            onClick={startTrivia}>New Game
          </button>)
        }

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
