import React, { useState } from 'react';
import "./Navbar.css"

const SidebarNavbar = ({ loggedUser, matches, handleChat, handleProfile, handleLogOut }) => {
    const [isExpanded, setIsExpanded] = useState(false);


    const handleToggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };


    const handleShowFindLove = () => {
        // Obsługa przycisku "Zdobywaj"
    };


    return (
        <nav className={isExpanded ? 'expanded' : ''} style={{ flex: 1 }}>
            <button onClick={handleToggleSidebar}></button>
            <img
                src="https://generated.inspirobot.me/a/5y6LqaADeW.jpg"
                alt="InspiroBot"
                style={{ height: '100px' }}
            />
            <h1>{loggedUser.name}</h1>
            <h1>Lvl.{loggedUser.age}</h1>
            <button onClick={handleProfile}>Profil</button>
            <button onClick={handleShowFindLove}>Zdobywaj</button>
            <h2>Lista zdobyczy</h2>
            <ul>
                {matches.map((match) => (
                    <button key={match.id} onClick={handleChat} name={match.id}>
                        {match.name}
                    </button>
                ))}
            </ul>
            <button onClick={handleLogOut}>Wyloguj</button>
            <style>
                {`nav{
                    width: ${isExpanded ? '200px' : '60px'};
                }`}
            </style>

        </nav>
    );
};

export default SidebarNavbar;
