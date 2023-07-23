import React, {useState} from 'react';
import "../Components/Background/LoginBackground.css"
import Button from "../Components/Button/Button";
import {useNavigate} from "react-router-dom";



const Login = () =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();

    const handleClick = (buttonType) => {
      if (buttonType === "back")   {
          navigate("/");
          document.body.classList.remove("login");
      }
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Tutaj możesz dodać logikę uwierzytelniania użytkownika
        console.log('Zalogowano:', username, password, rememberMe);
    };

    return (
        <div className="registerPage">
            <div className="registerBackground"></div>
            <div className="registerContainer">
                <h1 className="registerText">Welcome back</h1>

                <div className="registerForm">
                    <div className="container">

                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div>
                                    <h2>Name</h2>
                                    <input type="text" value={username} onChange={handleUsernameChange} className="inputField" />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div>
                                    <h2>Password</h2>
                                    <input type="password" value={password} onChange={handlePasswordChange} className="inputField" />
                                </div>
                            </div>
                        </div>

                        <div className="row" id="loginButtons">
                            <div className="col-lg-2"></div>
                            <div className="col-lg-2 p-4 mt-5">
                                <a href="" onClick={() => handleClick("back")}> &lt;Back</a>
                            </div>
                            <div className="col-lg-4 mt-5">
                                <Button className="buttonRegister" onClick={() => handleSubmit()} text="Login!" />
                            </div>
                            <div className="col-lg-2"></div>
                            <div className="col-lg-2"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}


export default Login;