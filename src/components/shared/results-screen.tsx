import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../../App";
import { quizData } from "../../data/quiz-data";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ResultsScreenProps {
  onRestart: () => void;
}

export default function ResultsScreen({ onRestart }: ResultsScreenProps) {
  const { score, answers } = useSelector((state: RootState) => state.quiz);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative z-10 w-full max-w-3xl mx-auto"
    >
      <div className="flex gap-x-4 items-center justify-center py-4">
        <h2 className="text-xl md:text-3xl font-bold text-black">
          Quiz Complete
        </h2>
        <p className="text-sm md:text-xl text-gray-500">
          You scored <span className="font-bold text-black">{score}</span> out
          of {quizData.length}
        </p>
      </div>

      <ScrollArea className="h-[572px] rounded-md border p-4 m-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {quizData.map((question, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-2">
                    Question {index + 1}
                  </p>
                  <p className="text-lg font-medium mb-4 text-gray-800">
                    {question.question}
                  </p>
                  <div className="space-y-1">
                    <p className="text-sm">
                      Your answer:{" "}
                      <span
                        className={
                          answers[index] === question.correctAnswer
                            ? "text-green-600 font-semibold"
                            : "text-red-600 font-semibold"
                        }
                      >
                        {answers[index] || "Not answered"}
                      </span>
                    </p>
                    <p className="text-sm">
                      Correct answer:{" "}
                      <span className="text-green-600 font-semibold">
                        {question.correctAnswer}
                      </span>
                    </p>
                  </div>
                </div>
                <div
                  className={`
                w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
                ${
                  answers[index] === question.correctAnswer
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }
              `}
                >
                  {answers[index] === question.correctAnswer ? "✓" : "×"}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>

      <div className="text-center">
        <Button
          onClick={onRestart}
          className="text-lg px-8 py-6 mb-4 rounded-full bg-white text-black hover:bg-gray-200"
        >
          Try Again
        </Button>
      </div>
    </motion.div>
  );
}
