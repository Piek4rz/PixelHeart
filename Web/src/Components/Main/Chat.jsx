import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Chat = ({ token, loggedUser, userChatId }) => {
  const [newMasseg, setMessage] = useState({
    id: 0,
    userId: 0,
    timestamp: "",
    message: "",
  });
  const [userChatting, setUserChatting] = useState({
    id: 0,
    name: "",
    email: "",
    password: "",
    age: 0,
    photo: "",
    backstory: "",
  });
  const [allMessages, setAllMessages] = useState([]);
  useEffect(() => {
    if (loggedUser && userChatId) {
      axios
        .get(
          `https://localhost:7081/api/User/${loggedUser.id}/mmessage/${userChatId}`
        )
        .then((res) => {
          var data = res.data;
          setAllMessages(data);
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
      var message = {
        id: allMessages.length,
        userId: loggedUser.id,
        timestamp: "",
        message: "",
      };
      setMessage(message);
      axios.get(`https://localhost:7081/api/User/${userChatId}`).then((res) => {
        var data = res.data;
        setUserChatting(data);
      });
    }
  }, [userChatId]);
  const reloadMessage = () => {
    axios
      .get(
        `https://localhost:7081/api/User/${loggedUser.id}/mmessage/${userChatId}`
      )
      .then((res) => {
        var data = res.data;
        setAllMessages(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleWyslij = () => {
    if (newMasseg.message != "") {
      if (allMessages.length === 0) {
        setAllMessages([newMasseg]);
      } else {
        setAllMessages([...allMessages, newMasseg]);
      }
      axios
        .put(
          `https://localhost:7081/api/User/${loggedUser.id}/mmessage/${userChatId}`,
          setAllMessages
        )
        .catch((error) => console.log(error.message));
      reloadMessage();
    }
  };
  const handleMessageChange = ({ currentTarget: input }) => {
    setMessage({ ...newMasseg, ["message"]: input.value });
  };
  return (
    <>
      <div>
        <h1>Chat z {userChatting.name}</h1>
        <div>
          {allMessages &&
            allMessages.map((mes) => (
              <h2>
                {mes.userId} - {mes.message}
              </h2>
            ))}
        </div>
        <input onChange={handleMessageChange} value={newMasseg.message}></input>
        <button onClick={handleWyslij}>Wyslij</button>
      </div>
    </>
  );
};
export default Chat;
