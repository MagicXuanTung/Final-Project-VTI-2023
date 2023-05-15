import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./layouts/dashboard";
// import Question from "./pages/dashboard/question";
// import Category from "./pages/dashboard/category";
// import Users from "./pages/dashboard/user";
// import Home from "./pages/dashboard/home";
// import Profile from "./pages/dashboard/profile";

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      {/* <Route path="/dashboard/home" element={<Home />} />
      <Route path="/dashboard/category" element={<Category />} />
      <Route path="/dashboard/question" element={<Question />} />
      <Route path="/dashboard/users" element={<Users />} />
      <Route path="/dashboard/profile" element={<Profile />} /> */}
    </Routes>
  );
}

export default App;