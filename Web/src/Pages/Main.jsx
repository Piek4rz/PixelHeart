import React from "react";
import Button from "../Components/Button/Button";
import "../Components/Button/Button.css";
import axios from "axios";
import { useState, useEffect } from "react";
import FindLove from "../Components/Main/FindLove";
import "../Components/Background/MainBackground.css";
import Navbar from "../Components/Navbar/Navbar";
import Profile from "../Components/Main/Profile";

const Main = () => {
    const [showProfile,setShowProfile] = useState(true);
  const [showFindLove, setShowFindLove] = useState(false);
  const [showChat, setSchowChat] = useState(false);
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
  }, []);

  useEffect(() => {
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
  }, [loggedUser.id]);

  const [findLove, setFindLove] = useState({
    id: 0,
    name: "",
    email: "",
    password: "",
    age: 0,
    photo: "",
    backstory: "",
  });
  const handleFindLove = (token) => {
    if (token) {
      axios
          .get(`https://localhost:7081/api/User/${loggedUser.id}/sex`)
          .then((res) => {
            const data = res.data;
            setFindLove(data);
          })
          .catch((error) => {
            console.log(error);
          });
    }
  };
  const [userChatId, setUserChatId] = useState(0);
  const handleChat = (id) => {
    setUserChatId(id);
    setShowFindLove(false);
    setSchowChat(true);
  };
  const handleProfile = () => {
      setShowProfile(true);
      setShowFindLove(false);
  };

  const handleShowFindLove = () => {
    handleFindLove(token);
    setShowProfile(false);
    console.log(findLove);
    setShowFindLove(true);
  };

  const reloadZdobycze = () => {
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
  };
  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="mainContainer">
      <div className="mainContents">

        <Navbar loggedUser={loggedUser} matches={matches} handleChat={handleChat} handleProfile={handleProfile} handleLogOut={handleLogOut} handleShowFindLove={handleShowFindLove}>
        </Navbar>

        {showFindLove && (
            <div style={{ flex: 1 }}>
              <FindLove
                  handleFindLove={handleFindLove}
                  token={token}
                  findLove={findLove}
                  loggedUser={loggedUser}
                  reloadZdobycze={reloadZdobycze}
              />
            </div>
        )}

          {showProfile &&<Profile token={token} loggedUser={loggedUser}/>}
      </div>

    </div>
  );
};

export default Main;
