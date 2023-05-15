import { useNavigate } from "react-router-dom";


const Result = ({ score }) => {
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
    <div class="result flex flex-col justify-center items-center h-screen text-center bg-gradient-to-r from-purple-400 to-pink-400">
      <span class="title text-4xl text-white font-bold mb-10">Final Score: {score}</span>
      <button class="bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2 mt-5" onClick={() => onBackClick1("/Homelogin")}>
        Go to homepage
      </button>
    </div>


  );
};

export default Result;
