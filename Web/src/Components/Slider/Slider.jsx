import React, { useState } from 'react';

const Slider = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event) => {
        const newValue = parseInt(event.target.value);
        setValue(newValue);
    };

    return (
        <div>
            <input
                type="range"
                min={0}
                max={100}
                value={value}
                onChange={handleChange}
            />
            <div>{value}%</div>
        </div>
    );
};

export default Slider;
