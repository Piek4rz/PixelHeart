import React from 'react';
import "./Button.css";

const Button = ({ onClick, text, className }) => {
    return (
        <button onClick={onClick} className={`allButtons ${className}`}>
            {text}
        </button>
    );
};

export default Button;
