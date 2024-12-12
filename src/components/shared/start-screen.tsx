import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-black">
          TEST
          <span className="block text-4xl md:text-6xl font-light italic">
            Your
          </span>
          KNOWLEDGE
        </h1>
        <p className="text-lg md:text-xl mb-12 text-gray-500">
          Challenge yourself with our frontend development quiz
        </p>
        <Button
          onClick={onStart}
          className="text-lg px-8 py-6 rounded-full bg-white text-black hover:bg-gray-200"
        >
          Start Quiz
        </Button>
      </motion.div>
    </div>
  );
}
