import React from 'react';

import Button from '../Components/Button/Button';
import "../Components/Button/Button.css";
import "../Components/Background/HomeBackground.css";
import logo from "../Assets/logo.svg";
import {useNavigate} from "react-router-dom";



const Home = () => {
    const navigate = useNavigate();
    const handleClick = (buttonType) => {
        if (buttonType === 'start')
        {
           navigate("/register")
        }
        else if (buttonType === 'continue')
        {
            navigate("/login")
        }
    };

    return (
        <div className="pageContainer">
            <div className="landingPageBackground">

                <img className="logo" src={logo} alt="PixelHeart" />
                <div className="text1">
                    <h1>Znajdź alternatywkę lub egirla, która zniszczy ci życie!</h1>
                    <h2>Zacznij swoją przygodę już dziś</h2>
                </div>
            </div>
            <Button className="buttonStart" onClick={() => handleClick('start')} text="Start Game" />

            <Button className="buttonContinue" onClick={() => handleClick('continue')} text="Continue" />
            <div className="text2">
                <h2>lub wróć do swojego poprzedniego zapisu</h2>
            </div>

        </div>

    );
};

export default Home;