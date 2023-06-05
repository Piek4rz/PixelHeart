import React, { useState } from 'react';
import "./StatButton.css"

const StatButton = ({ id, text, selectedCount, setSelectedCount, setSelectedText }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleClick = () => {
        if (isChecked) {
            setIsChecked(false);
            setSelectedCount(selectedCount - 1);
        } else {
            if (selectedCount < 6) {
                setSelectedText(text);
                setIsChecked(true);
                setSelectedCount(selectedCount + 1);
            }
        }
    };

    return (
        <button onClick={handleClick} className={`statButtons ${isChecked ? 'checked' : ''}`}>
            {text}
        </button>
    );
};

export default StatButton;

