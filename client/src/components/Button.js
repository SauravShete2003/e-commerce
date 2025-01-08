import React from "react";

function Button({ label, onClick, variant }) {
  const BTN_STYLES = {
    primary: "bg-blue-500 hover:bg-blue-700 text-white font-bold ",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold ",
    tertiary:"bg-transparent hover:bg-gray-200 text-gray-700 font-bold ",
    link:"border border-blue-500 hover:border-blue-700 text-blue-500 hover:text-blue-700",
    warning: "bg-red-500 hover:bg-red-700 text-white font-bold ",
    success: "bg-green-500 hover:bg-green-700 text-white font-bold ",
  }
  return (
    <button type="button" onClick={onClick}
    className={`btn py-2 px-4 rounded-full ${BTN_STYLES[variant]}`}
    >
      {label}
    </button>
  );
}

export default Button;
