import React from "react";

function Button({ type = "button", btnTitle, onBtnClick }) {
  return (
    <button
      type={type}
      onClick={onBtnClick}
      className="px-5 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white font-medium shadow hover:shadow-xl hover:scale-105 active:scale-95 transition duration-300 cursor-pointer"
    >
      {btnTitle}
    </button>
  );
}

export default Button;
