import React from 'react';

function Input({ label, val, onChange, placeholder = "", type = "text" }) {
  const inputId = `input${label}`;
  return (
    <div>
      <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          id={inputId}
          name={inputId}
          type={type}
          required
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder={placeholder}
          value={val}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Input;
