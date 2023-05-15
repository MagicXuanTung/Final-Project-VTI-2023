import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {

  // LOGIN RA ĐĂNG KÝ CHƯA CÓ TÀI KHOẢN
  const navigate = useNavigate()
  const onBackClick = e => {
    e.preventDefault()
    navigate("/register")
  }

  //KO LOGIN VỀ HOME VIEW:
  const onBackClick1 = e => {
    e.preventDefault()
    navigate("/")
  }


  // LOGIN THÀNH CÔNG VỀ HOME
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username);
  }

  const routeChange = async () => {
    const res = await axios.post('http://localhost:8080/api/auth/signin', {
      username,
      password,
    })
    const resdata = res.data // data JSON POSTMAN
    const status = res.status // status http
    const data_status = resdata.status // status ResponseObject
    const token = resdata.accessToken
    const id = resdata.id
    localStorage.setItem('userId', id)
    localStorage.setItem('token', token)
    localStorage.setItem('username', username)
    console.log({
      data: resdata,
    })
    let path = `/Homelogin`;
    console.log(resdata.username);
    navigate(path, { state: { username: resdata.username, email: resdata.email } });
  }

  return (
    <div className="h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
      <div className="auth-form-container p-100 rounded-lg shadow-lg bg-white" style={{ padding: '100px' }}>
        <h2 className="text-7xl font-bold text-gray-800 mb-4 text-center" style={{ fontSize: '5.0rem' }}>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username" className="text-gray-800 font-semibold mb-2">UserName</label>
          <input
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            placeholder="Your username"
            className="bg-gray-200 p-3 rounded-md mb-4 text-gray-900"
          />
          <label htmlFor="password" className="text-gray-800 font-semibold mb-2">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Your password"
            id="password"
            name="password"
            className="bg-gray-200 p-3 rounded-md mb-4 text-gray-900"
          />
          <button
            type="submit"
            onClick={routeChange}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 ease-in-out"
          >
            Log In
          </button>
        </form>
        <button
          onClick={onBackClick}
          className="text-gray-600 font-bold mt-4 hover:text-purple-600 transition-colors duration-300 ease-in-out text-2xl"
        >
          Don't have an account? Register here.
        </button>
        <button
          onClick={onBackClick1}
          className="text-gray-600 font-bold mt-4 hover:text-red-600 transition-colors duration-300 ease-in-out text-2xl"
        >
          RETURN HOME TO VIEW!
        </button>
      </div>
    </div>
  );
};

export default Login;
