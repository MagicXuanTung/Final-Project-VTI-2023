import { useGlobalContext } from "./context";
import Form from "./components/Form";
import Loading from "./components/Loading";
import Modal from "./components/Modal";


const QuizGame = () => {
  const {
    waiting,
    loading,
    index,
    questions,
    nextQuestion,
    checkAnswer,
  } = useGlobalContext();



  if (waiting) {
    return <Form />;
  }

  if (loading) {
    return <Loading />;
  }

  const { incorrect_answers, correct_answer, question } = questions[index];
  const answers = [...incorrect_answers];
  if (incorrect_answers.length > 1) {
    let num = Math.floor(Math.random() * 4);
    if (num === 3) {
      answers.push(correct_answer);
    } else {
      answers.push(answers[num]);
      answers[num] = correct_answer;
    }
  } else {
    let num = Math.floor(Math.random() * 2);
    answers.push(answers[num]);
    answers[num] = correct_answer;
  }
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% hover:from-pink-500 hover:to-yellow-500">
      <Modal />
      <div className="p-3 py-5 md:p-8 bg-white shadow rounded-lg max-w-[9000px] w-11/12 min-h-[500px]">
        <p className="text-right pb-2 text-green-600">
          Number:{" "}
          <span>
            {index + 1}/{questions.length}
          </span>
        </p>
        <div className="mt-3">
          <p
            className="text-center text-black font-medium text-2xl lg:text-3xl leading-loose"
            dangerouslySetInnerHTML={{ __html: question }}
          />
          <div className="grid grid-cols-4 my-16 space-y-1 place-content-center">
            {answers.map((answer, index) => {
              return (
                <button
                  onClick={() => checkAnswer(answer === correct_answer)}
                  key={index}
                  className="bg-blue-500 w-4/5 rounded-lg mx-auto text-white p-2 hover:bg-red-600"
                  dangerouslySetInnerHTML={{
                    __html: answer,
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className="flex justify-center pt-4">
          <button
            onClick={nextQuestion}
            className="py-2 px-7 text-medium flex rounded-lg text-white bg-yellow-600 hover:bg-green-700">Next question</button>
        </div>
      </div>
    </main>
  );
};

export default QuizGame;



// HACK QUIZ SHOW ĐÁP ÁN
// import { useState } from "react";
// import { useGlobalContext } from "./context";
// import Form from "./components/Form";
// import Loading from "./components/Loading";
// import Modal from "./components/Modal";

// const QuizGame = () => {
//   const {
//     waiting,
//     loading,
//     index,
//     questions,
//     nextQuestion,
//     checkAnswer,
//   } = useGlobalContext();

//   const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

//   if (waiting) {
//     return <Form />;
//   }
//   if (loading) {
//     return <Loading />;
//   }

//   const { incorrect_answers, correct_answer, question } = questions[index];
//   const answers = [...incorrect_answers];
//   if (incorrect_answers.length > 1) {
//     let num = Math.floor(Math.random() * 4);
//     if (num === 3) {
//       answers.push(correct_answer);
//     } else {
//       answers.push(answers[num]);
//       answers[num] = correct_answer;
//     }
//   } else {
//     let num = Math.floor(Math.random() * 2);
//     answers.push(answers[num]);
//     answers[num] = correct_answer;
//   }

//   return (
//     <main className="min-h-screen flex items-center justify-center">
//       <Modal />
//       <div className="p-3 py-5 md:p-8 bg-white shadow rounded-lg max-w-[9000px] w-11/12 min-h-[500px]">
//         <p className="text-right pb-2 text-green-600">
//           Number:{" "}
//           <span>
//             {index + 1}/{questions.length}
//           </span>
//         </p>
//         <div className="mt-3">
//           <p
//             className="text-center text-black font-medium text-2xl lg:text-3xl leading-loose"
//             dangerouslySetInnerHTML={{ __html: question }}
//           />
//           <div className="grid grid-cols-4 my-16 space-y-1 place-content-center">
//             {answers.map((answer, index) => {
//               const isCorrect = answer === correct_answer;
//               const answerClass = `bg-blue-500 w-4/5 rounded-lg mx-auto text-white p-2 hover:bg-green-500 ${showCorrectAnswer && isCorrect ? "bg-green-500" : ""
//                 }`;
//               return (
//                 <button
//                   onClick={() => {
//                     checkAnswer(isCorrect);
//                     setShowCorrectAnswer(true);
//                   }}
//                   key={index}
//                   className={answerClass}
//                   dangerouslySetInnerHTML={{
//                     __html: answer,
//                   }}
//                 />
//               );
//             })}
//           </div>
//         </div>
//         <div className="flex justify-center pt-4">
//           <button
//             onClick={() => {
//               setShowCorrectAnswer(false);
//               nextQuestion();
//             }}
//             className="py-2 px-7 text-medium flex rounded-lg text-white bg-yellow-600 hover:bg-green-700"
//           >
//             Next question
//           </button>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default QuizGame;
