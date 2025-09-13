import React from "react";

function Button({ type = "button", btnTitle, onBtnClick }) {
  return (
    <button
      type={type}
      onClick={onBtnClick}
      className="
        px-5 py-2 
        rounded-lg 
        bg-gradient-to-r from-red-500 to-red-600 
        text-white font-medium 
        shadow-md hover:shadow-lg 
        hover:scale-105 active:scale-95 
        transition-all duration-300 ease-in-out cursor-pointer
      "
    >
      {btnTitle}
    </button>
  );
}

export default Button;
