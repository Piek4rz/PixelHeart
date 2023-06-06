import React from "react";

import "./Components/Button/Button.css";
import "./Components/Background/HomeBackground.css";
import { Route, Routes, Navigate } from "react-router";
import Home from "./Pages/Home";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import CreateProfile from "./Pages/CreateProfile";
import Main from "./Pages/Main";

const App = () => {
  const userLoggedIn = localStorage.getItem("token") != null;
  return (
    <Routes>
      {userLoggedIn ? (
        <>
          <Route path="/" element={<Main />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/CreateProfile" element={<CreateProfile />} />
        </>
      )}
    </Routes>
  );
};

export default App;
