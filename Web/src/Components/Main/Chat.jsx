import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Chat = ({ token, loggedUser, chatUser }) => {
  const [newMasseg, setMessage] = useState({
    id: 0,
    userId: 0,
    timestamp: "",
    message: "",
  });
  const [allMessages, setAllMessages] = useState([]);
  useEffect(() => {
    if (loggedUser && chatUser) {
      axios
        .get(
          `https://localhost:7081/api/User/${loggedUser.id}/mmessage/${chatUser.id}`
        )
        .then((res) => {
          var data = res.data;
          setAllMessages(data);
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  return (
    <>
      <div>
        {allMessages.map((mes) => (
          <h2>mess.userId - mes.message</h2>
        ))}
      </div>
    </>
  );
};
export default Chat;
