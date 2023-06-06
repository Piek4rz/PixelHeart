import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Profile = ({ token, loggedUser }) => {
  const [loveGames, setLoveGames] = useState([]);
  const [loveStats, setLoveStats] = useState([]);
  useEffect(() => {
    if (loggedUser) {
      axios
        .get(`https://localhost:7081/api/User/${loggedUser.id}/skill`)
        .then((res) => {
          var data = res.data;
          console.log(data);
          setLoveStats(data);
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get(`https://localhost:7081/api/User/${loggedUser.id}/game`)
        .then((res) => {
          var data = res.data;
          console.log(data);
          setLoveGames(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  return (
    <>
      <h1>
        {loggedUser?.name && (
          <>
            {loggedUser.name} Lvl{loggedUser.age}
          </>
        )}
      </h1>
      <h2>{loggedUser?.backstory && loggedUser.backstory}</h2>
      <h2>Twoje skille</h2>
      <ul>
        {loveStats.map((skill) => (
          <li>
            {skill.item1} - {skill.item2}
          </li>
        ))}
      </ul>
      <h2>Twoje Gierki:</h2>
      <ul>
        {loveGames.map((game) => (
          <li>{game.name}</li>
        ))}
      </ul>
    </>
  );
};
export default Profile;
