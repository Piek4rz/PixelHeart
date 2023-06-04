import React, {useState} from 'react';
import "../Components/Background/LoginBackground.css"
import Button from "../Components/Button/Button";



const Login = () =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

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
        <div className="loginPage">
            <div className="loginBackground"></div>
            <div className="loginContainer">
                <h1 className="loginText">Witaj ponownie!</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h2>Login</h2>
                            <input type="text" className="inputField" value={username} onChange={handleUsernameChange} />

                    </div>
                    <div>
                        <h2>Hasło</h2>
                            <input type="password" className="inputField" value={password} onChange={handlePasswordChange} />

                    </div>
                    <div className="submitContainer">
                            <label>
                                <input type="checkbox" checked={rememberMe} onChange={handleRememberMeChange} />
                                Zapamiętaj mnie
                            </label>

                        <div className="submitButton">
                            <Button onClick={() => handleSubmit()} text="Zaloguj" ></Button>

                        </div>


                    </div>
                    <div className="forgot">
                        <a href="/przywroc-haslo">Zapomniałeś hasła?</a>
                    </div>
                </form>
            </div>
    </div>
    );
}


export default Login;