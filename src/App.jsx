import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import VenuePage from "./pages/VenuePage";
import LoginForm from "./pages/Login";
import RegisterForm from "./pages/Register";
import ProfilePage from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/venues/:id" element={<VenuePage></VenuePage>} />
        <Route path="/login" element={<LoginForm></LoginForm>}></Route>
        <Route path="/register" element={<RegisterForm></RegisterForm>}></Route>
        <Route path="/profile/:name" element={<ProfilePage />} ></Route>
      </Routes>
    </Router>
  );
}

export default App;