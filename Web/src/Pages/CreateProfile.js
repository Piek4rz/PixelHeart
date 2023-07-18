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
        id: 0,
        name: "",
        email: "",
        password: "",
        age: 0,
        backstory: "",
        photo: "",
    });
    const [token, setToken] = useState(localStorage.getItem("token"));
    useEffect(() => {
        setToken(localStorage.getItem("token"));
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

    const [lvlValues, setLvlValues] = useState([]);
    const [keyValues, setKeyValues] = useState([]);
    const [lvl, setLvl] = useState({ id: 0, lvl: 0 });

    const handleInputChange = (event, index) => {
        const newValue = event.target.value;
        const newLvlValues = [...lvlValues];
        newLvlValues[index] = newValue;
        setLvlValues(newLvlValues);
        console.log(lvlValues);
    };
    const handleSelectChange = (event, index) => {
        const newValue = event.target.value;
        const newKeyValues = [...keyValues];
        newKeyValues[index] = newValue;
        setKeyValues(newKeyValues);
        console.log(keyValues);
    };

    const statDivs = Array.from({ length: 6 }, (_, index) => (
        <div className="stat" key={index}>
            <select
                className="selectCustom"
                onChange={(event) => handleSelectChange(event, index)}
            >
                {stats.map((stat,optionIndex) => (
                    <option
                        className="optionCustom"
                        key={optionIndex}
                        value={stat}
                    >
                        {stat}
                    </option>
                ))}
            </select>
            <div>
                <input
                    key={index}
                    type="range"
                    min={0}
                    max={100}
                    value={lvlValues[index] || 0}
                    onChange={(event) => handleInputChange(event, index)}
                />
                <div>{lvlValues[index] || 0}%</div>
            </div>
        </div>
    ));

    // const statDivs = Array.from({ length: 6 }, (_, index) => (
    //   <div className="stat" key={index}>
    //     <select
    //       key={index}
    //       className="selectCustom"
    //       onChange={(event) => handleSelectChange(event, index)}
    //     >
    //       {allStats.map((stat) => (
    //         <option
    //           className="optionCustom"
    //           key={stat.id}
    //           id={stat.id}
    //           value={stat.name}
    //         >
    //           {stat.name}
    //         </option>
    //       ))}
    //     </select>
    //     <div>
    //       <input
    //         key={index}
    //         type="range"
    //         min={0}
    //         max={100}
    //         value={lvlValues[index] || 0}
    //         onChange={(event) => handleInputChange(event, index)}
    //       />
    //       <div>{lvlValues[index] || 0}%</div>
    //     </div>
    //   </div>
    // ));

    const gameDivs = games.map((game) => (
        <div
            className={selectedDivs.includes(game) ? "game selected" : "game"}
            onClick={() => handleClickDiv(game)}
        >
            <p>{game}</p>
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
        if (selectedDivs) {
            selectedDivs.map((gameId) => {
                axios
                    .post(`https://localhost:7081/api/User/${user.id}/Game/${gameId}`)
                    .catch((error) => {
                        console.log(error);
                    });
            });
        }
        if (keyValues.length === 6 && lvlValues.length === 6) {
            const selectedStatsDataArray = [];

            keyValues.forEach((statName, index) => {
                const stat = allStats.find((s) => s.name === statName);
                if (stat) {
                    const { id } = stat;
                    const lvl = lvlValues[index];
                    const selectedStatData = { id, lvl };
                    selectedStatsDataArray.push(selectedStatData);
                }
            });
            selectedStatsDataArray.map((stat) => {
                axios
                    .post(
                        `https://localhost:7081/api/User/${user.id}/Skill/${stat.id}/${stat.lvl}`
                    )
                    .catch((error) => {
                        console.log(error);
                    });
            });
        }
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
        setUser({ ...user, [input]: imageUrl });
    };

    return (
        <div>
            <div className="createProfileContainer">
                <div className="profileContents">
                    <div className="title">
                        <h1>Create your profile</h1>
                    </div>
                    <div className="columns">
                        <div className="stage" id="s1">
                            <h3>1. Choose a picture</h3>
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
                            <h3>2. Tell your story</h3>
                            <div className="descField">
                                <textarea name="backstory" onChange={handleChange}></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="stage" id="s3">
                        <h3>3. Show your skills</h3>
                        <p>
                            Choose 6 skills and select your experience level
                        </p>
                        <div className="statsFrame">{statDivs}</div>
                    </div>

                    <div className="stage" id="s3">
                        <h3>4. Whats your favourite games?</h3>
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
