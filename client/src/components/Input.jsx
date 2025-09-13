import React from "react";

function Input({ type, name, id, placeholder,min,max, value, onInputChange }) {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      min={min}
      max={max}
      className="shadow p-3"
      value={value}
      onChange={onInputChange}
    />
  );
}

export default Input;
