import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../App";
import { quizData } from "../../data/quiz-data";
import { answerQuestion, moveToNextQuestion } from "../../store/quiz-slice";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface QuestionCardProps {
  questionNumber: number;
  timeRemaining: number;
}

export default function QuestionCard({
  questionNumber,
  timeRemaining,
}: QuestionCardProps) {
  const dispatch = useDispatch();
  const { currentAnswer, timerActive } = useSelector(
    (state: RootState) => state.quiz
  );
  const question = quizData[questionNumber - 1];

  const getButtonClass = (option: string) => {
    if (!currentAnswer && timerActive)
      return "bg-gray-800 text-white hover:bg-white hover:text-black";
    if (option === question.correctAnswer) return "bg-green-500 text-white";
    if (option === currentAnswer) return "bg-red-500 text-white";
    return "bg-gray-700 text-gray-300";
  };

  const handleAnswer = (answer: string) => {
    if (timerActive && !currentAnswer) {
      dispatch(answerQuestion(answer));
    }
  };

  const handleNextQuestion = () => {
    dispatch(moveToNextQuestion());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="text-center mb-4">
        <motion.p
          className="text-sm font-medium text-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          QUESTION {questionNumber} / {quizData.length}
        </motion.p>
      </div>

      <motion.div
        className="bg-gray-900/20 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl border border-gray-800"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-2 md:p-6">
          <h2 className="text-2xl md:text-3xl font-medium text-center mb-6 text-white">
            {question.question}
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {question.options.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  onClick={() => handleAnswer(option)}
                  disabled={!timerActive || !!currentAnswer}
                  className={`
                    w-full h-auto py-6 px-8 text-sm md:text-lg rounded-2xl transition-all duration-300 truncate
                    ${getButtonClass(option)}
                  `}
                >
                  {option}
                  {(!timerActive || currentAnswer) &&
                    option === question.correctAnswer && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="ml-2 text-sm md:text-md"
                      >
                        ✓
                      </motion.span>
                    )}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {(!timerActive || currentAnswer) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-center"
          >
            <p className="text-sm px-2 font-medium mb-2">
              {currentAnswer ? (
                currentAnswer === question.correctAnswer ? (
                  <span className="text-green-500">Correct!</span>
                ) : (
                  <span className="text-red-500">
                    Incorrect. The correct answer was: {question.correctAnswer}
                  </span>
                )
              ) : (
                <span className="text-yellow-500">
                  Time's up! The correct answer was: {question.correctAnswer}
                </span>
              )}
            </p>
            <Button
              onClick={handleNextQuestion}
              className="text-lg px-6 py-3 rounded-full bg-white text-black hover:bg-gray-200 transition-all duration-300"
            >
              Next Question
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col py-4 items-center justify-center text-sm"
      >
        <div className="w-64 h-2 bg-black rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white rounded-full"
            initial={{ width: "100%" }}
            animate={{ width: `${(timeRemaining / 60) * 100}%` }}
            transition={{ duration: 1, ease: "linear" }}
          />
        </div>
        <span className="font-medium text-black">{timeRemaining}s</span>
      </motion.div>
    </motion.div>
  );
}
