import React from "react";

function Input({ type, name, id, placeholder, value, onInputChange }) {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      className="shadow p-3"
      value={value}
      onChange={onInputChange}
    />
  );
}

export default Input;
