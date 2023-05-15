
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Categories from "../../Data/Categories";


const HomeTopic = ({ fetchQuestions }) => {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    fetchQuestions(category, difficulty);
    navigate("/quiz");
  };

  const onBackClick = () => {
    const token = localStorage.getItem('token')
    const username = localStorage.getItem('username')
    navigate('/Homelogin', {
      state: {
        token: token, username: username
      }
    })
  }


  return (
    <div class="h-screen w-screen flex bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 items-center justify-center">
      <div class="content flex items-center justify-center bg-black-100 p-8 text-black h-90% w-11/12 max-w-[1100px] p-5 md:p-8 rounded">
        <div class="settings bg-white p-8 rounded-lg shadow-md h-auto w-11/12 max-w-[1100px] p-5 md:p-8 rounded">
          <h1 class="text-5xl mb-8 text-indigo-700 font-bold flex items-center justify-center">Setup Your Topics</h1>
          <div class="settings__select">
            <div class="mb-8">
              <label for="category" class="block text-xl font-medium text-gray-700 mb-2">Select Topics</label>
              <select id="category" name="category" class="border border-gray-300 rounded-md shadow-sm py-4 px-5 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full text-xl" value={category} onChange={(e) => setCategory(e.target.value)}>
                {Categories.map((cat) => (
                  <option key={cat.category} value={cat.value} class="text-xl">
                    {cat.category}
                  </option>
                ))}
              </select>
            </div>
            <div class="mb-8">
              <label for="difficulty" class="block text-xl font-medium text-gray-700 mb-2">Select Difficulty</label>
              <select id="difficulty" name="difficulty" class="border border-gray-300 rounded-md shadow-sm py-4 px-5 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full text-xl" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option key="easy" value="easy" class="text-green-500 font-medium text-xl">Easy</option>
                <option key="medium" value="medium" class="text-yellow-500 font-medium text-xl">Medium</option>
                <option key="hard" value="hard" class="text-red-500 font-medium text-xl">Hard</option>
              </select>
            </div>
            <button class="bg-indigo-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded" onClick={handleSubmit}>
              Start Quiz
            </button>
            <button class="bg-gray-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded float-right" onClick={onBackClick}>
              Return to homepage !
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default HomeTopic;
