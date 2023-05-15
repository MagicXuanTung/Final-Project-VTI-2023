
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import QuizGame from './QuizGame'
import FormCategory from './components/FormCategory'
import Homelogin from './components/Homelogin';
import { useState } from "react";
import HomeTopic from "./Pages/Home/HomeTopic";
import Quiz from "./Pages/Quiz/Quiz";
import Result from "./Pages/Result/Result";
import axios from "axios";
import QuizGame1 from './QuizGame1';
import Form from './components/Form';
import Profile from './components/Profile';



function App() {
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);

  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );

    setQuestions(data.results);
  };

  return (
    <Router>
      <Routes>
        <Route index="/" element={<Home />} />
        <Route path="/homelogin" element={<Homelogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/quizgame" element={<QuizGame />} />
        <Route path="/quizgame1" element={<QuizGame1 />} />
        <Route path="/hometopic" element={<HomeTopic fetchQuestions={fetchQuestions} />} />
        <Route path="/quiz" element={<Quiz questions={questions} score={score} setScore={setScore} setQuestions={setQuestions} />} />
        <Route path="/result" element={<Result score={score} />} />
        <Route path="/quizgame/:category" element={<Form />} />
        <Route path="/quizgame1/:category" element={<FormCategory />} />
      </Routes>
    </Router>
  );
}

export default App;

