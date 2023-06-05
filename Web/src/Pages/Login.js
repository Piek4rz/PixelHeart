import React, { useState } from "react";
import "../Components/Background/LoginBackground.css";
import Button from "../Components/Button/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = () => {
    if (!data) {
      console.log(data);
      return;
    }
    axios
      .post("https://localhost:7081/api/Auth/login", data)
      .then((res) => {
        localStorage.setItem("token", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/");
  };

  return (
    <div className="loginPage">
      <div className="loginBackground"></div>
      <div className="loginContainer">
        <h1 className="loginText">Witaj ponownie!</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <h2>Login</h2>
            <input
              type="text"
              className="inputField"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <h2>Hasło</h2>
            <input
              type="password"
              name="password"
              className="inputField"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <div className="submitContainer">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              Zapamiętaj mnie
            </label>

            <div className="submitButton">
              <Button onClick={() => handleSubmit()} text="Zaloguj"></Button>
            </div>
          </div>
          <div className="forgot">
            <a href="/przywroc-haslo">Zapomniałeś hasła?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
