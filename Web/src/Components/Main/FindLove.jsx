import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const FindLove = ({
  handleFindLove,
  token,
  findLove,
  loggedUser,
  reloadZdobycze,
}) => {
  const [loveGames, setLoveGames] = useState([]);
  const [loveStats, setLoveStats] = useState([]);
  useEffect(() => {
    if (findLove) {
      console.log(findLove);
      axios
        .get(`https://localhost:7081/api/User/${findLove.id}/skill`)
        .then((res) => {
          var data = res.data;
          console.log(data);
          setLoveStats(data);
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get(`https://localhost:7081/api/User/${findLove.id}/game`)
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

  const handleBywaj = () => {
    var fujka = false;
    if (findLove) {
      axios
        .get(`https://localhost:7081/api/User/${findLove.id}/skill`)
        .then((res) => {
          var data = res.data;
          console.log(data);
          setLoveStats(data);
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get(`https://localhost:7081/api/User/${findLove.id}/game`)
        .then((res) => {
          var data = res.data;
          console.log(data);
          setLoveGames(data);
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .post(
          `https://localhost:7081/api/User/${loggedUser.id}/match/${findLove.id}/false`
        )
        .catch((error) => {
          console.log(error);
        });
    }
    handleFindLove(token);
    reloadZdobycze();
  };
  const handlePokazTowary = () => {
    if (findLove) {
      axios
        .get(`https://localhost:7081/api/User/${findLove.id}/skill`)
        .then((res) => {
          var data = res.data;
          console.log(data);
          setLoveStats(data);
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get(`https://localhost:7081/api/User/${findLove.id}/game`)
        .then((res) => {
          var data = res.data;
          console.log(data);
          setLoveGames(data);
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .post(
          `https://localhost:7081/api/User/${loggedUser.id}/match/${findLove.id}/true`
        )
        .catch((error) => {
          console.log(error);
        });
    }
    handleFindLove(token);
    reloadZdobycze();
  };
  return (
    <>
      <div>
        <div>
          <p>{findLove?.photo && findLove.photo}</p>
          <h1>
            {findLove?.name && (
              <>
                {findLove.name} Lvl{findLove.age}
              </>
            )}
          </h1>
          <h2>{findLove?.backstory && findLove.backstory}</h2>
          <h2>Skille:</h2>
          <ul>
            {loveStats.map((skill) => (
              <li>
                {skill.item1} - {skill.item2}
              </li>
            ))}
          </ul>
          <h2>Gierki:</h2>
          <ul>
            {loveGames.map((game) => (
              <li>{game.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <button onClick={handlePokazTowary}>Pokaz mi swoje towary</button>
          <button onClick={handleBywaj}>Bywaj</button>
        </div>
      </div>
    </>
  );
};

export default FindLove;
