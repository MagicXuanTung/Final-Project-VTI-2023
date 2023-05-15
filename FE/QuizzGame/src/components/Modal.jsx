import { useGlobalContext } from "../context";
import Confetti from "react-confetti";

const Modal = () => {
  const { closeModal, isModalOpen, correct, questions } = useGlobalContext();
  let score = ((correct / questions.length) * 100).toFixed(0);
  return (
    <>
      {isModalOpen && (
        <div className="absolute top-0 left-0 h-screen w-full flex items-center justify-center bg-[rgba(0,0,0,.5)]">
          {score > 40 && <Confetti />}
          <div className="text-center bg-white p-8 mx-auto rounded-lg max-w-[600px] w-11/12">
            <h4 className="text-3xl pb-3 text-center font-bold">
              Your score is{" "}
              <span
                className={
                  score > 40 ? "text-green-600" : "text-red-600"
                }
              >
                {score}%
              </span>
            </h4>
            <p className="py-2 text-black">
              You got {correct}/{questions.length}
            </p>
            {score > 40 && (
              <p className="py-2 text-green-600 font-medium">Congrats!!!</p>
            )}
            {score <= 40 && (
              <p className="py-2 text-red-600 font-medium">
                Better luck next time!
              </p>
            )}
            <button
              className="bg-yellow-500 hover:bg-yellow-600 py-2 px-7 rounded-lg text-white mt-2 mr-2"
              onClick={closeModal}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;