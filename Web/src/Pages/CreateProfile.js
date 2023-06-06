import { useNavigate } from "react-router-dom";
import "../Components/Background/CreateProfileBackgorund.css";
import Button from "../Components/Button/Button";
import Slider from "../Components/Slider/Slider";
import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateProfile = () => {
    const navigate = useNavigate();
    const [selectedDivs, setSelectedDivs] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [allGames, setAllGames] = useState([]);
    const [allStats, setAllStats] = useState([]);
    const [user, setUser] = useState({
        id: 2,
        name: "strin321321g",
        email: "stri321312ng",
        password: "string",
        age: 0,
        backstory: "string",
        photo: "",
        userSkills: null,
        userGames: null,
        matches: null,
    });
    const token = localStorage.getItem("token");
    useEffect(() => {
        axios
            .get("https://localhost:7081/api/Games")
            .then((response) => {
                const data = response.data;
                console.log(data);
                setAllGames(data);
            })
            .catch((error) => {
                console.error(error);
            });
        axios
            .get("https://localhost:7081/api/Skill")
            .then((response) => {
                const data = response.data;
                console.log(data);
                setAllStats(data);
            })
            .catch((error) => {
                console.error(error);
            });
        axios
            .get(`https://localhost:7081/token/${token}`)
            .then((response) => {
                const data = response.data;
                console.log(data);
                setUser(data);
            })
            .catch((error) => {
                console.error(error);
            }); //tutaj dac ze jak pusty to wyswietlenie cos poszlo nie tak
    }, []);

    const stats = [
        "Gaming",
        "social Skills",
        "Party",
        "Agility",
        "Strength",
        "Sanity",
        "Tekst 7",
        "Tekst 8",
        "Tekst 9",
        "Tekst 10",
        "Tekst 11",
        "Tekst 12",
    ];

    const games = [
        "Minecraft",
        "League of Legends",
        "CS:GO",
        "Valorant",
        "Overwatch",
        "Skyrim",
        "Dont Starve",
        "Apex Legends",
        "Diablo III",
        "Team Fortress 2",
        "Fortnite",
        "Fall Guys",
        "GTA: Onlnie",
        "Rocket League",
        "Destiny 2",
    ];

    const statDivs = Array.from({ length: 6 }, (_, index) => (
        <div className="stat" key={index}>
            <select className="selectCustom" key={index}>
                {allStats.map((stat) => (
                    <option className="optionCustom" key={stat.id} value={stat.name}>
                        {stat.name}
                    </option>
                ))}
            </select>
            <Slider></Slider>
        </div>
    ));

    const gameDivs = allGames.map((game) => (
        <div
            className={selectedDivs.includes(game.id) ? "game selected" : "game"}
            key={game.id}
            onClick={() => handleClickDiv(game.id)}
        >
            <p>{game.name}</p>
        </div>
    ));

    const handleSubmitClick = () => {
        axios
            .put(`https://localhost:7081/api/User/${user.id}`, user)
            .then((res) => {
                console.log(res.data);
                console.log("Eureka udalo sie!");
            })
            .catch((error) => {
                console.error(error);
            });
        navigate("/Main");
    };

    const handleClickDiv = (gameId) => {
        if (selectedDivs.includes(gameId)) {
            setSelectedDivs(selectedDivs.filter((id) => id !== gameId));
        } else {
            setSelectedDivs([...selectedDivs, gameId]);
        }
        console.log(selectedDivs);
    };
    const handleChange = ({ currentTarget: input }) => {
        setUser({ ...user, [input.name]: input.value });
    };
    const handleFileUpload = (event) => {
        const selectedFile = event.target.files[0];
        const imageUrl = URL.createObjectURL(selectedFile);
        setSelectedImage(imageUrl);
        var input = "photo";
        setUser({ ...user, [input]: input });
        console.log(imageUrl);
        console.log(user);
    };

    return (
        <div>
            <div className="createProfileContainer">
                <div className="profileContents">
                    <div className="title">
                        <h1>Stwórz Profil</h1>
                    </div>
                    <div className="columns">
                        <div className="stage" id="s1">
                            <h3>1. Wybierz swoje zdjęcie</h3>
                            <input
                                className="customInput"
                                type="file"
                                id="fileInput"
                                name="fileInput"
                                accept="image/jpeg, image/png"
                                onChange={handleFileUpload}
                            />
                            <div
                                className="pictureFrame"
                                style={{
                                    backgroundImage: `url(${selectedImage}`,
                                    backgroundSize: `contain`,
                                }}
                            ></div>
                        </div>

                        <div className="stage" id="s2">
                            <h3>2. Opowiedz swoją historię</h3>
                            <div className="descField">
                                <textarea name="backstory" onChange={handleChange}></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="stage" id="s3">
                        <h3>3. Pokaż swoje umiejętności</h3>
                        <p>
                            Wybierz 6 umiejętności, a nastepnie ustaw ich poziom od 0 do 100
                        </p>
                        <div className="statsFrame">{statDivs}</div>
                    </div>

                    <div className="stage" id="s3">
                        <h3>4. Jakie są twoje ulubione gry?</h3>
                        <div className="gamesFrame">{gameDivs}</div>
                    </div>
                    <div className="confirm">
                        <Button
                            className="buttonConfirm"
                            onClick={() => handleSubmitClick()}
                            text="Continue"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProfile;