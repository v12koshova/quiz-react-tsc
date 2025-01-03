export const TOTAL_NUMBER = 10

export const shuffleArray = (arr: any[]) => [...arr].sort(() => Math.random() - 0.5)

export type QuestionType = {
  question: string,
  answers: string[],
  correctAnswer: string
}

export type Category = {
  id: number | string,
  name: string
}