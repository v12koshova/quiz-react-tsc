import { Category, QuestionType } from "./App";
import { shuffleArray } from "./utils";


export const fetchCategories = async(): Promise<Category[]> => {
  try {
    const response = await fetch('https://opentdb.com/api_category.php')
    const data = await response.json();
    return data.trivia_categories
  } catch {
    throw new Error('Failed to fetch categories')
  }
}


type ResponceQuestionType = {
  category: string,
  correct_answer: string,
  difficulty: string,
  incorrect_answers: string[],
  question: string,
  type: string,
}
export const fetchQuestions = async(category: string = '', difficulty: string = ''): Promise<QuestionType[] | undefined> => {
    try {
          const response = await fetch(`https://opentdb.com/api.php?amount=10&type=multiple&category=${category}&difficulty=${difficulty}`);
          const data = await response.json();
    
          const formattedQuestions: QuestionType[] = data.results.map((q: ResponceQuestionType) => ({
            question: q.question,
            answers: shuffleArray([...q.incorrect_answers, q.correct_answer]),
            correctAnswer: q.correct_answer,
          }));
    
          return formattedQuestions
        } catch (error) {
          console.error('Error fetching trivia questions:', error);
        }
}