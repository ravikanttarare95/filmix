import React from "react";

function Input({
  type,
  name,
  id,
  placeholder,
  min,
  max,
  value,
  onInputChange,
}) {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      min={min}
      max={max}
      value={value}
      onChange={onInputChange}
      className="w-full p-3 rounded-md 
                 bg-gradient-to-br from-gray-800 to-gray-700 text text-white placeholder-gray-400
                 border border-gray-700 
                 focus:border-red-500 focus:ring-1 focus:ring-yellow-400
                 outline-none transition duration-300"
    />
  );
}

export default Input;
