import React, { useState } from "react";

function Signup() {
  const [signupData, setSingupData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    rePassword: "",
  });
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: "#1E88E5" }}
    >
      <h1>Signup</h1>
      <form className="w-96 p-8 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray"
            id="username"
            type="text"
            placeholder="Username"/>
        </div>
      </form>
    </div>
  );
}

export default Signup;
