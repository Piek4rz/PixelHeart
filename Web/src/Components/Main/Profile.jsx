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
      console.log(`https://localhost:7081/api/User/${loggedUser.id}/game`);
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
  }, [loggedUser]);
  return (
    <>
        <div className="mainContents">
            <div className="column outerColumn">
                <div className="text">

                    <h2>Twoje skille</h2>
                    <ul>
                        {loveStats.map((skill) => (
                            <li>
                                {skill.item1}:   {skill.item2}
                            </li>
                        ))}
                    </ul>

                </div>
            </div>
            <div className="column">
                <h1>
                    {loggedUser?.name && (
                        <>
                            {loggedUser.name} Lvl{loggedUser.age}
                        </>
                    )}
                </h1>
                <div className="profileImage">
                    <img src="https://ocdn.eu/pulscms-transforms/1/TMBk9kpTURBXy82MDE2NjdmMDYxMTkwMjBlOTQ0NzlkNmNhZTE0NDgzNC5qcGeTlQPNBAUAzQOuzQWGkwXNAWjNAfSTBc0BaM0B9N4AAqEwAaExAA" />
                </div>
                <h2>{loggedUser?.backstory && loggedUser.backstory}</h2>
            </div>
            <div className="column outerColumn">
                <div className="text">

                    <h2>Twoje Gierki:</h2>
                    <ul>
                        {loveGames.map((game) => (
                            <li>{game.name}</li>
                        ))}
                    </ul>

                </div>
            </div>
        </div>
    </>
  );
};


export default Profile;
