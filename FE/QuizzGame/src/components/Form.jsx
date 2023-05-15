import { useGlobalContext } from "../context";
import { useNavigate } from 'react-router-dom';


const Form = () => {

  const { quiz, handleSubmit, handleChange, error } = useGlobalContext();

  const navigate = useNavigate();
  const onBackClick1 = () => {
    const token = localStorage.getItem('token')
    const username = localStorage.getItem('username')
    navigate('/Homelogin', {
      state: {
        token: token, username: username
      }
    })
  }


  return (

    <div className="flex justify-center items-center min-h-screen h-screen bg-gradient-to-tl from-pink-500 to-yellow-500  hover:from-purple-400 hover:to-pink-500">
      <form
        onSubmit={handleSubmit}
        className="w-11/12 max-w-[1100px] p-5 md:p-8 bg-white shadow rounded-lg space-y-8"
      >
        <h2 className="text-5xl font-medium text-green-800 mb-6 text-center ">MAIN MENU QUIZZ</h2>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="amount"
            className="font-medium text-gray-800"
          >
            Number of Questions:
          </label>
          <select
            placeholder="5-20"
            type="number"
            id="amount"
            name="amount"
            className="p-2 bg-gray-200 rounded-md outline-none focus:bg-gray-300 text-black "
            value={quiz.amount}
            onChange={handleChange}
            min={5}
            max={20}
          >
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">1</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>

          </select>
        </div>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="category"
            className="font-medium text-gray-800"
          >
            Select Category:
          </label>
          <select
            id="category"
            name="category"
            className="p-2 bg-gray-200 rounded-md outline-none focus:bg-gray-300 text-black"
            value={quiz.category}
            onChange={handleChange}
          >
            <option value="sports">Sports Quiz</option>
            <option value="politics">Politics Quiz</option>
            <option value="history">History Quiz</option>
            <option value="science">Science Quiz</option>
            <option value="geographyquiz">Geography Quiz</option>
            <option value="food&drinksquiz">Food & Drinks Quiz</option>
            <option value="musicquiz">Music Quiz</option>
            <option value="generalknowledgequiz">General Knowledge Quiz</option>
          </select>
        </div>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="difficulty"
            className="font-medium text-gray-800"
          >
            Select Level:
          </label>
          <select
            id="difficulty"
            name="difficulty"
            className="p-2 bg-gray-200 rounded-md outline-none focus:bg-gray-300 text-black"
            value={quiz.difficulty}
            onChange={handleChange}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="type" className="font-medium text-gray-800 text-black">
            Select Type:
          </label>
          <select
            id="type"
            name="type"
            className="p-2 bg-gray-200 rounded-md outline-none focus:bg-gray-300 text-black pointer-events-none"
            // value={quiz.type}
            onChange={handleChange}
          >
            <option value="multiple">Multiple Choice</option>
            {/* <option value="boolean">True or False</option> */}
          </select>
        </div>
        {error && (
          <p className="text-red-600 text-sm">
            Can't Generate Questions, Please Try Different Options
          </p>
        )}
        <button
          type="submit"
          className="w-full p-2 bg-yellow-600 rounded-md bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md "
        >
          Start Quiz
        </button>
        <button
          onClick={onBackClick1}
          className="w-full p-2 bg-blue-600 rounded-md bg-gray-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md "
        >
          RETURN TO HOMEPAGE!
        </button>
      </form>
    </div>
  )
};

export default Form