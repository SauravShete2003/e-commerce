import React from 'react';

function Input({ label, val, onChange, placeholder = "", type = "text" }) {
  const inputId = `input${label}`;
  return (
    <div className="mb-6">
      <label
        className="block text-gray-800 text-sm font-semibold mb-2"
        htmlFor={inputId}
      >
        {label}
      </label>
      <input
        className="shadow-md border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 ease-in-out sm:text-sm"
        id={inputId}
        type={type}
        placeholder={placeholder}
        value={val}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default Input;
