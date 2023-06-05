import React, { useState } from "react";

const Slider = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value);
    setValue(newValue);
  };

  return <></>;
};

export default Slider;
