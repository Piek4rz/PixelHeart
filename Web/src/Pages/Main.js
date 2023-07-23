import React from "react";
import Button from "../Components/Button/Button";
import "../Components/Button/Button.css";
import "../Components/Background/HomeBackground2.css";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";
import "../Components/Background/MainBackground.css";
import Profile from "./ProfileSubpages/Profile";
import Find from "./ProfileSubpages/Find";
import List from "./ProfileSubpages/List";

const Main = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loggedUser, setLoggedUser] = useState({
    id: 0,
    name: "",
    email: "",
    password: "",
    age: 0,
    photo: "",
    backstory: "",
  });

  const [matches, setMatches] = useState([
    "Halincia123",
    "Marianna",
    "YoloJolka",
  ]);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token) {
      axios
        .get(`https://localhost:7081/token/${token}`)
        .then((response) => {
          const data = response.data;
          console.log(data);
          setLoggedUser(data);
        })
        .catch((error) => {
          console.log(error);
          localStorage.removeItem("token");
          window.location.reload();
        });
    }
    axios
      .get(`https://localhost:7081/api/User/${loggedUser.id}/matched`)
      .then((res) => {
        const data = res.data;
        console.log(data);
        setMatches(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="mainContainer">
      <div className="mainContents">
        {/*<nav>*/}
        {/*  <p>Witaj w mojej karczmie</p>*/}
        {/*  <img src="https://static1.personality-database.com/profile_images/79234575fdf14620b58b46d00d826aff.png" />*/}
        {/*   <p>{loggedUser.name}</p> */}
        {/*   <p>Lvl.{loggedUser.age}</p> */}

        {/*  <Link to="profile">Profile</Link>*/}
        {/*  <Link to="love">Find Love</Link>*/}
        {/*  <p>Love list</p>*/}
        {/*  <ul>*/}
        {/*    {matches.map((match) => (*/}
        {/*      <li>*/}
        {/*        <Link to="chat">{match}</Link>*/}
        {/*      </li>*/}
        {/*    ))}*/}
        {/*  </ul>*/}
        {/*</nav>*/}

        <div className="nav">
          <a href="#" className="navbar-brand">PixelHeart</a>
          <ul className="navbar-menu">
            <li className="navbar-item">
                <Link to="profile">
                  <img src="https://static1.personality-database.com/profile_images/79234575fdf14620b58b46d00d826aff.png" alt="Profil"/>
                  Profile
                </Link>
            </li>
            <li className="navbar-item">
              <Link to="love">Find</Link>
            </li>
            <li className="navbar-item">
              <Link to="list">List</Link>
            </li>
            <li className="navbar-item">
              <select className="selectCustom" id="main">
                <option hidden value="" disabled selected>Settings</option>
                <option>Update Profile</option>
                <option>Log Out</option>
              </select>
            </li>
          </ul>
        </div>
        <Routes>
          <Route path="profile" exec element={<Profile/>} />
          <Route path="love" exec element={<h1><Find/></h1>} />
          <Route path="list" exec element={<h1><List/></h1>} />
          <Route path="/" exec element={<h1>Główny main!</h1>} />
          <Route path="/*" exec element={<h1>?????</h1>} />
        </Routes>
      </div>
    </div>
  );
};

export default Main;
