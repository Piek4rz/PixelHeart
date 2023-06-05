import {useNavigate} from "react-router-dom";
import "../Components/Background/CreateProfileBackgorund.css"
import Button from "../Components/Button/Button";
import Slider from "../Components/Slider/Slider";
import React, {useState} from "react";

const CreateProfile = () =>{
    const navigate = useNavigate();
    const [selectedDivs, setSelectedDivs] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);


    const stats = [
        'Gaming',
        'social Skills',
        'Party',
        'Agility',
        'Strength',
        'Sanity',
        'Tekst 7',
        'Tekst 8',
        'Tekst 9',
        'Tekst 10',
        'Tekst 11',
        'Tekst 12',
    ];

    const games = [
        'Minecraft',
        'League of Legends',
        'CS:GO',
        'Valorant',
        'Overwatch',
        'Skyrim',
        'Dont Starve',
        'Apex Legends',
        'Diablo III',
        'Team Fortress 2',
        'Fortnite',
        'Fall Guys',
        'GTA: Onlnie',
        'Rocket League',
        'Destiny 2',
    ];


    const statDivs = Array.from({ length: 6 }, (_, index) => (
        <div className="stat" key={index}>
            <select className="selectCustom">
                {stats.map((stat, statIndex) => (
                    <option className="optionCustom" key={statIndex} value={stat}>{stat}</option>
                ))}
            </select>
            <Slider></Slider>
        </div>
    ));

    const gameDivs = games.map((game, index) => (
        <div
            className={selectedDivs.includes(index) ? 'game selected' : 'game'}
            key={index}
            onClick={() => handleClickDiv(index)}
        >
            <p>{game}</p>
        </div>
    ));

    const handleClick = () => {
        navigate("/Home")
    };

    const handleClickDiv = (gameId) => {console.log(selectedDivs);
        if (selectedDivs.includes(gameId)) {
            setSelectedDivs(selectedDivs.filter((id) => id !== gameId));
        } else {
            setSelectedDivs([...selectedDivs, gameId]);
        }
    };

    const handleFileUpload = (event) => {
        const selectedFile = event.target.files[0];
        const imageUrl = URL.createObjectURL(selectedFile);
        setSelectedImage(imageUrl);
    }


    return (
        <div>
            <div className="createProfileContainer">
                <div className="profileContents">
                    <div className="title"><h1>Stwórz Profil</h1></div>
                    <div className="columns">

                        <div className="stage" id="s1">
                            <h3>1. Wybierz swoje zdjęcie</h3>
                            <input className="customInput" type="file" id="fileInput" name="fileInput"
                                   accept="image/jpeg, image/png" onChange={handleFileUpload}/>
                            <div className="pictureFrame" style={{backgroundImage: `url(${selectedImage}`, backgroundSize: `contain`}}>

                            </div>
                        </div>

                        <div className="stage" id="s2">
                            <h3>2. Opowiedz swoją historię</h3>
                            <div className="descField">
                                <textarea></textarea>
                            </div>
                        </div>
                    </div>

                        <div className="stage" id="s3">
                            <h3>3. Pokaż swoje umiejętności</h3>
                            <p>Wybierz 6 umiejętności, a nastepnie ustaw ich poziom od 0 do 100</p>
                            <div className="statsFrame">
                                {statDivs}
                            </div>
                            </div>

                        <div className="stage" id="s3">
                            <h3>4. Jakie są twoje ulubione gry?</h3>
                                <div className="gamesFrame">
                                    {gameDivs}
                                </div>

                        </div>
                    <div className="confirm">
                        <Button className="buttonConfirm" onClick={() => handleClick('continue')} text="Continue" />
                    </div>

                </div>
            </div>
        </div>
    )
};

export default CreateProfile;