import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


const Register = (props) => {

  // TỪ ĐĂNG KÝ VỀ LOGIN
  const navigate = useNavigate()
  const onBackClick = e => {
    e.preventDefault()
    // navigate(-1);
    navigate("/login")
  }

  // ĐĂNG KÝ THÀNH CÔNG VỀ LOGIN
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  }
  const routeChange = async () => {
    console.log({ username: username, password: password, email: email })
    const res = await axios.post('http://localhost:8080/api/auth/signup', {
      username,
      password,
      email,
    })
    const resdata = res.data // data JSON POSTMAN
    const status = res.status // status http
    const data_status = resdata.status // status ResponseObject
    const token = resdata.accessToken
    const id = resdata.id
    localStorage.setItem('userId', id)
    localStorage.setItem('token', token) // Save token
    console.log({
      userId: id,
      data: resdata,
      status: status,
      message: resdata.message,
      datastatus: data_status,
      accessToken: token,
    })
    let path = `/login`
    navigate(path)
  }
  return (
    <div className="h-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% flex items-center justify-center">
      <div className="auth-form-container p-100 rounded-lg shadow-lg bg-white" style={{ padding: '100px' }}>
        <h2 className="text-7xl font-bold text-gray-800 mb-4 text-center" style={{ fontSize: '5.0rem' }}>Register</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email" className="text-gray-800 font-semibold mb-2">Email</label>
          <input
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="@gmail.com"
            className="bg-gray-200 p-3 rounded-md mb-4 text-gray-900"
          />
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
            Register
          </button>
        </form>
        <button onClick={onBackClick} className="text-gray-600 font-bold mt-4 hover:text-purple-600 transition-colors duration-300 ease-in-out text-2xl">Already have an account? Login here.</button>
      </div>
    </div>
  );
};
export default Register
