import React, { useEffect } from "react";

import Button from "../Components/Button/Button";
import "../Components/Button/Button.css";
import "../Components/Background/HomeBackground2.css";
import logo from "../Assets/logo.svg";
import { useNavigate } from "react-router-dom";
import c1 from "../Assets/c1.png";
import c2 from "../Assets/c2.png";
import c3 from "../Assets/c3.png";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("home");
  });
  const handleClick = (buttonType) => {
    if (buttonType === "start") {
      navigate("/register");
      document.body.classList.remove("home");
    } else if (buttonType === "continue") {
      navigate("/login");
      document.body.classList.remove("home");
    }
  };

  return (
    <div className="pageContainer">
      <div className="landingPageBackground"></div>
      <div className="scroll">
        <div className="landingPage">
          <div className="navbar">
            <a href="strona_home.html">
              <div className="left">PixelHeart</div>
            </a>
            <div className="right">
              <a href="/">
                <div>Home</div>
              </a>
              <a href="strona_about_us.html">
                <div>About Us</div>
              </a>
              <a href="" onClick={() => handleClick("continue")}>
                <div>Login</div>
              </a>
              {/*<div> <Button onClick={() => handleClick()} text="Login" ></Button></div>*/}
            </div>
          </div>
          <div className="content">
            <div className="text">
              <div className="headline"> Forge Unbreakable Gaming Bonds</div>
              <div className="bottomText">Find Your Perfect Match Online!</div>
            </div>
            <div className="getStarted">
              <div>
                {" "}
                <Button
                  onClick={() => handleClick("start")}
                  text="Get Started"
                ></Button>
              </div>
            </div>
          </div>
        </div>
        <div className="landingPage info">
          <div className="stars">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <h1>Info</h1>
        </div>
      </div>
      <div className="clouds">
        <img className="c1" src={c1} />
        <img className="c2" src={c2} />
        <img className="c3" src={c3} />
      </div>
    </div>
  );
};

export default Home;
