import React from "react";

function Button({ label, onClick, variant }) {
  const BTN_STYLES = {
    primary:
      "bg-blue-500 hover:bg-blue-600 text-white font-bold shadow-md hover:shadow-lg",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold shadow-md hover:shadow-lg",
    tertiary:
      "bg-transparent hover:bg-gray-100 text-gray-700 font-bold border border-gray-300 shadow-sm hover:shadow-md",
    link:
      "border border-blue-500 text-blue-500 hover:border-blue-700 hover:text-blue-700 font-medium",
    warning:
      "bg-red-500 hover:bg-red-600 text-white font-bold shadow-md hover:shadow-lg",
    success:
      "bg-green-500 hover:bg-green-600 text-white font-bold shadow-md hover:shadow-lg",
    logout:"text-xl"
  };

  const COMMON_STYLES =
    "py-2 px-6 rounded-full transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 active:scale-95";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`btn ${COMMON_STYLES} ${BTN_STYLES[variant]}`}
    >
      {label}
    </button>
  );
}

export default Button;
