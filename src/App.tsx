import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import Quiz from "./components/shared/quiz";
import quizReducer from "./store/quiz-slice";

const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default function Home() {
  return (
    <Provider store={store}>
      <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
        <Quiz />
      </main>
    </Provider>
  );
}
