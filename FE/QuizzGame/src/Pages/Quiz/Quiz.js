import { useEffect, useState } from "react";
import Question from "../../components/Question/Question";


const Quiz = ({ questions, score, setScore, setQuestions }) => {
  const [options, setOptions] = useState();
  const [currQues, setCurrQues] = useState(0);

  useEffect(() => {
    setOptions(
      questions &&
      handleShuffle([
        questions[currQues]?.correct_answer,
        ...questions[currQues]?.incorrect_answers,
      ])
    );
  }, [currQues, questions]);

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  return (
    <div class="quiz min-h-screen bg-gradient-to-r from-green-400 hover:from-pink-500 hover:to-yellow-500 py-8 px-4 md:py-16 md:px-8 flex flex-col justify-center items-center text-black">
      {questions ? (
        <>
          <div class="quizInfo text-lg md:text-xl font-medium mb-8 md:mb-12">
            <span>{questions[currQues].category}</span>
            <div></div>
            <span>Your Score : {score}</span>
          </div>
          <Question
            currQues={currQues}
            setCurrQues={setCurrQues}
            questions={questions}
            options={options}
            correct={questions[currQues]?.correct_answer}
            score={score}
            setScore={setScore}
            setQuestions={setQuestions}
          />
        </>
      ) : (
        <div class="flex justify-center items-center h-screen">
          <svg
            class="animate-spin h-10 w-10 text-indigo-500"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 016 12H2c0 3.042 1.135 5.824 3 7.938l-.002-.002zm12-5.291a7.962 7.962 0 01-2 5.291l.002.002A8.002 8.002 0 0120 12h-4zm-6-6v6h6v-6h-6z"
            ></path>
          </svg>
        </div>
      )}
    </div>

  );
};

export default Quiz;