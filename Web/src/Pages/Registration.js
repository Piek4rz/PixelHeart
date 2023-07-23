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

    const handleClick = (buttonType) => {
        if (buttonType === "back")   {
            navigate("/");
            document.body.classList.remove("register");
        }
    };
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
        <div className="registerPage">
            <div className="registerBackground"></div>
            <div className="registerContainer">
                <h1 className="registerText">Register</h1>
                <div className="registerForm">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row gx-5 ">
                                <div className="col-lg-6">
                                    <div>
                                        <h2>Username</h2>
                                        <input type="text" value={name} onChange={handleNameChange} className="inputField" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div>
                                        <h2>Email</h2>
                                        <input type="email" value={email} onChange={handleEmailChange} className="inputField" />
                                    </div>
                                </div>
                            </div>
                            <div className="row gx-5 ">
                                <div className="col-lg-6">
                                    <div>
                                        <h2>Password</h2>
                                        <input type="password" value={password} onChange={handlePasswordChange} className="inputField" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div>
                                        <h2>Comfirm Password</h2>
                                        <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} className="inputField" />
                                    </div>
                                </div>
                            </div>
                            <div className="row gx-5 align-items-center">
                                <div className="col-lg-6">
                                    <h2>Age</h2>
                                    <input type="number" value={age} onChange={handleAgeChange} className="inputFieldAge" />
                                </div>
                                <div className="col-lg-6 mt-5">
                                    <input type="checkbox" id="agreement" checked={agreement} onChange={handleAgreementChange} name="agreement" />
                                    <label htmlFor="agreement">Accept terms and conditions</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-2 ">
                                </div>
                                <div className="col-lg-2 p-4 mt-5">
                                    <a href="" onClick={() => handleClick("back")}>&lt;Back</a>
                                </div>
                                <div className="col-lg-4 mt-5">
                                    <Button className="buttonRegister" onClick={() => handleSubmit()} text="Register!" ></Button>
                                </div>
                                <div className="col-lg-2">
                                </div>
                                <div className="col-lg-2">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}





export default Registration;