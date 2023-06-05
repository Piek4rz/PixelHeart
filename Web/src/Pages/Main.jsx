import React from "react";
import Button from "../Components/Button/Button";
import "../Components/Button/Button.css";
import "../Components/Background/HomeBackground.css";
import logo from "../Assets/logo.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

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
  const [matches, setMatches] = useState([]);
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
    <>
      {" "}
      <div>
        <h1>Witaj w mojej karczmie</h1>
        <nav>
          <img src="https://generated.inspirobot.me/a/5y6LqaADeW.jpg" />
          <h1>{loggedUser.name}</h1>
          <h1>Lvl.{loggedUser.age}</h1>
          <button>Profil</button>
          <button>Zdobywaj</button>
          <h2>Lista zdobyczy</h2>
          <ul>
            {matches.map((match) => (
              <button>{match.name}</button>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Main;
