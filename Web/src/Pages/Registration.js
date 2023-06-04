import React, {useState} from 'react';
import "../Components/Background/RegistrationBackground.css";
import Button from "../Components/Button/Button";
import {useNavigate} from "react-router-dom";


function Registration() {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [age, setAge] = useState('');
    const [agreement, setAgreement] = useState(false);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleAgeChange = (event) => {
        setAge(event.target.value);
    };

    const handleAgreementChange = () => {
        setAgreement(!agreement);
    };

    const handleSubmit = (event) => {

            navigate("/CreateProfile")

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
                            <input type="text" value={name} onChange={handleNameChange} className="inputField" />
                        </div>
                        <div>
                            <h2>Email</h2>
                            <input type="email" value={email} onChange={handleEmailChange} className="inputField" />
                        </div>
                    </div>
                    <div className="col">
                        <div>
                            <h2>Hasło</h2>
                            <input type="password" value={password} onChange={handlePasswordChange} className="inputField" />
                        </div>
                        <div>
                            <h2>Potwierdź Hasło</h2>
                            <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} className="inputField" />
                        </div>
                    </div>
                    <div className="col2">
                        <div>
                            <h2>Wiek</h2>
                            <input type="number" value={age} onChange={handleAgeChange} className="inputFieldAge" />
                        </div>
                    </div>
                    <div className="col3">
                        <input type="checkbox" id="agreement" checked={agreement} onChange={handleAgreementChange} name="agreement" />
                        <label htmlFor="agreement">Zgoda na warunki</label>
                    </div>
                    <div className="col4">
                        <div className="back">
                            <a href="/" >&lt;Powrót</a>
                        </div>
                        <Button onClick={() => handleSubmit()} text="Zarejestruj" ></Button>
                    </div>
                </div>
            </div>
        </div>
    );
}





export default Registration;