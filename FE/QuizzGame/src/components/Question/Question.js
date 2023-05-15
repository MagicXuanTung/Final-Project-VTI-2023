import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Question.css";


const Question = ({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  setScore,
  score,
}) => {
  const [selected, setSelected] = useState();


  const navigate = useNavigate();

  const handleSelect = (i) => {
    if (selected === i && selected === correct) return "select";
    else if (selected === i && selected !== correct) return "wrong";
    else if (i === correct) return "select";
  };

  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct) setScore(score + 1);

  };

  const handleNext = () => {
    if (currQues > 8) {
      navigate("/result");
    } else if (selected) {
      setCurrQues(currQues + 1);
      setSelected();
    }
  };



  return (
    <div className="question max-w-7xl w-full p-8 rounded-lg shadow-md bg-white">
      <h1 className="text-4xl mb-8 text-indigo-700 font-bold">Question {currQues + 1} :</h1>
      <div className="singleQuestion w-full rounded-lg border-4 border-gray-500 p-8 mb-8">
        <h2 className="text-2xl mb-4">{questions[currQues].question}</h2>
        <div className="options flex flex-wrap justify-around">
          {options &&
            options.map((i) => (
              <button
                className={`singleOption bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${selected && handleSelect(i)}`}
                key={i}
                onClick={() => handleCheck(i)}
                disabled={selected}
              >
                {i}
              </button>
            ))}
        </div>
        <div className="controls flex justify-around">
          <button
            className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${currQues > 20 ? "bg-blue-500 hover:bg-blue-700" : ""}`}
            style={{ width: 185 }}
            onClick={handleNext}
          >
            {currQues > 20 ? "Submit" : "Next Question"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;
