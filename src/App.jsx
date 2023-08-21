import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import VenuePage from "./pages/VenuePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/venues/:id" element={<VenuePage></VenuePage>} />
      </Routes>
    </Router>
  );
}

export default App;