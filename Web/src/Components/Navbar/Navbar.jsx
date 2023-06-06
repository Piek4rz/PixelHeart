import React, { useState } from 'react';
import "./Navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars, faBolt, faSignOutAlt, faTasks, faUser} from '@fortawesome/free-solid-svg-icons';


const SidebarNavbar = ({ loggedUser, matches,handleChat, handleProfile, handleLogOut, handleShowFindLove }) => {
    const [isExpanded, setIsExpanded] = useState(false);


    const handleToggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };



    return (
        <nav className={isExpanded ? 'expanded' : ''} style={{ flex: 1 }}>
            <button className="expandButton" onClick={handleToggleSidebar}>
                <FontAwesomeIcon icon={faBars} />
            </button>
            <img className="navbarImage"
                src="https://ocdn.eu/pulscms-transforms/1/TMBk9kpTURBXy82MDE2NjdmMDYxMTkwMjBlOTQ0NzlkNmNhZTE0NDgzNC5qcGeTlQPNBAUAzQOuzQWGkwXNAWjNAfSTBc0BaM0B9N4AAqEwAaExAA"
                alt="InspiroBot"

            />
            <h1>{isExpanded ? `${loggedUser.name}` : ""} <br></br>
                {isExpanded ? `Lvl. ${loggedUser.age}` : ""} </h1>
            <button onClick={handleProfile}>
                {isExpanded ? 'Profil' : <FontAwesomeIcon icon={faUser} />}
            </button>
            <button onClick={handleShowFindLove}>
                {isExpanded ? 'Zdobywaj' : <FontAwesomeIcon icon={faBolt} />}
            </button>
            <h2>  {isExpanded ? 'Lista zdobyczy' : <FontAwesomeIcon icon={faTasks} />}
                </h2>
            <ul>
                {matches.map((match) => (
                    <button key={match.id} onClick={handleChat} name={match.id}>
                        {match.name}
                    </button>
                ))}
            </ul>
            <button onClick={handleLogOut}>
                {isExpanded ? 'Wyloguj' : <FontAwesomeIcon icon={faSignOutAlt} />}
            </button>
            <style>
                {`nav{
                    width: ${isExpanded ? '200px' : '60px'};
                }`}
            </style>

        </nav>
    );
};

export default SidebarNavbar;
