// frontend/src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Setup from "./pages/Setup";
import Profile from "./pages/MyProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/setup" element={<Setup />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
