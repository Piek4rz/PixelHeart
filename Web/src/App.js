import React from "react";

import "./Components/Button/Button.css";
import "./Components/Background/HomeBackground.css";
import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import CreateProfile from "./Pages/CreateProfile";

const App = () => {
  const user = localStorage.getItem("token");
  return (
    <Routes>
      {/* {user && <Route path="/" element={<Main />} />} */}
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/CreateProfile" element={<CreateProfile />} />
    </Routes>
  );
};

export default App;
