import React, { useState } from "react";
import "../Components/Background/RegistrationBackground.css";
import Button from "../Components/Button/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Registration() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    age: 0,
    backstory: "",
  });
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  //   const [name, setName] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //   const [age, setAge] = useState("");
  const [agreement, setAgreement] = useState(false);

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleAgreementChange = () => {
    setAgreement(!agreement);
  };

  const handleSubmit = () => {
    if (!data) {
      console.log(data);
      return;
    }
    axios
      .post("https://localhost:7081/api/Auth/register", data)
      .then((res) => {
        localStorage.setItem("token", res.data);
      })
      .catch((error) => console.log(error));
    navigate("/CreateProfile");
  };

  return (
    <div>
      <div className="registerBackground"></div>
      <div className="registerContainer">
        <h1 className="registerText">Zarejestruj się</h1>
        <div className="registerForm">
          <div className="col">
            <div>
              <h2>Nazwa</h2>
              <input
                type="text"
                value={data.name}
                name="name"
                onChange={handleChange}
                className="inputField"
              />
            </div>
            <div>
              <h2>Email</h2>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                className="inputField"
              />
            </div>
          </div>
          <div className="col">
            <div>
              <h2>Hasło</h2>
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                className="inputField"
              />
            </div>
            <div>
              <h2>Potwierdź Hasło</h2>
              <input
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="inputField"
              />
            </div>
          </div>
          <div className="col2">
            <div>
              <h2>Wiek</h2>
              <input
                type="number"
                name="age"
                value={data.age}
                onChange={handleChange}
                className="inputFieldAge"
              />
            </div>
          </div>
          <div className="col3">
            <input
              type="checkbox"
              id="agreement"
              checked={agreement}
              onChange={handleAgreementChange}
              name="agreement"
            />
            <label htmlFor="agreement">Zgoda na warunki</label>
          </div>
          <div className="col4">
            <div className="back">
              <a href="/">&lt;Powrót</a>
            </div>
            <Button onClick={() => handleSubmit()} text="Zarejestruj"></Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
