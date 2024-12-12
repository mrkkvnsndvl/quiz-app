import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../App";
import { resetQuiz, startQuiz, updateTimer } from "../../store/quiz-slice";
import QuestionCard from "./question-card";
import ResultsScreen from "./results-screen";
import StartScreen from "./start-screen";

export default function Quiz() {
  const dispatch = useDispatch();
  const {
    quizStarted,
    currentQuestion,
    showResults,
    timeRemaining,
    timerActive,
  } = useSelector((state: RootState) => state.quiz);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (quizStarted && !showResults && timerActive) {
      timer = setInterval(() => {
        dispatch(updateTimer());
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizStarted, showResults, timerActive, dispatch]);

  return (
    <div className="relative min-h-screen overflow-hidden circular-bg">
      <div className="absolute inset-0 noise-bg"></div>
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!quizStarted && (
            <StartScreen key="start" onStart={() => dispatch(startQuiz())} />
          )}
          {quizStarted && !showResults && (
            <QuestionCard
              key={`question-${currentQuestion}`}
              questionNumber={currentQuestion + 1}
              timeRemaining={timeRemaining}
            />
          )}
          {showResults && (
            <ResultsScreen
              key="results"
              onRestart={() => dispatch(resetQuiz())}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
