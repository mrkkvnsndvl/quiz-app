import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { quizData } from "../data/quiz-data";

interface QuizState {
  currentQuestion: number;
  score: number;
  showResults: boolean;
  quizStarted: boolean;
  answers: (string | null)[];
  timeRemaining: number;
  currentAnswer: string | null;
  timerActive: boolean;
}

const initialState: QuizState = {
  currentQuestion: 0,
  score: 0,
  showResults: false,
  quizStarted: false,
  answers: Array(quizData.length).fill(null),
  timeRemaining: 60,
  currentAnswer: null,
  timerActive: true,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    startQuiz: (state) => {
      state.quizStarted = true;
      state.timeRemaining = 60;
    },
    answerQuestion: (state, action: PayloadAction<string>) => {
      const currentQuestion = quizData[state.currentQuestion];
      state.currentAnswer = action.payload;
      state.timerActive = false;
      if (action.payload === currentQuestion.correctAnswer) {
        state.score += 1;
      }
    },
    moveToNextQuestion: (state) => {
      if (state.currentAnswer !== null || state.timeRemaining === 0) {
        state.answers[state.currentQuestion] = state.currentAnswer;
        state.currentQuestion += 1;
        state.timeRemaining = 60;
        state.currentAnswer = null;
        state.timerActive = true;
        if (state.currentQuestion === quizData.length) {
          state.showResults = true;
        }
      }
    },
    skipQuestion: (state) => {
      state.answers[state.currentQuestion] = null;
      state.currentQuestion += 1;
      state.timeRemaining = 60;
      if (state.currentQuestion === quizData.length) {
        state.showResults = true;
      }
    },
    resetQuiz: () => initialState,
    updateTimer: (state) => {
      if (state.timerActive && state.timeRemaining > 0) {
        state.timeRemaining -= 1;
      } else if (state.timerActive && state.timeRemaining === 0) {
        state.timerActive = false;
      }
    },
  },
});

export const {
  startQuiz,
  answerQuestion,
  moveToNextQuestion,
  skipQuestion,
  resetQuiz,
  updateTimer,
} = quizSlice.actions;
export default quizSlice.reducer;
