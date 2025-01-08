import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

function Signup() {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    rePassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signupData);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: "#1E88E5" }}
    >
      <h1 className="text-4xl font-bold text-white mb-6">Signup</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg"
      >
        <Input
          label={"Name"}
          type="text"
          placeholder="Enter your name"
          val={signupData.name}
          onChange={(val) => setSignupData({ ...signupData, name: val })}
        />
        <Input
          label={"Email"}
          type="email"
          placeholder="Enter your email"
          val={signupData.email}
          onChange={(val) => setSignupData({ ...signupData, email: val })}
        />
        <Input
          label={"Phone"}
          type="number"
          placeholder="Enter your phone number"
          val={signupData.phone}
          onChange={(val) => setSignupData({ ...signupData, phone: val })}
        />
        <Input
          label={"Address"}
          type="text"
          placeholder="Enter your address"
          val={signupData.address}
          onChange={(val) => setSignupData({ ...signupData, address: val })}
        />
        <Input
          label={"Password"}
          type="password"
          placeholder="Enter your password"
          val={signupData.password}
          onChange={(val) => setSignupData({ ...signupData, password: val })}
        />
        <Input
          label={"Re-enter Password"}
          type="password"
          placeholder="Re-enter your password"
          val={signupData.rePassword}
          onChange={(val) => setSignupData({ ...signupData, rePassword: val })}
        />
        <div className="flex justify-between mt-6">
          <Button
            label={"Cancel"}
            onClick={() => console.log("Cancel clicked")}
            variant={"warning"}
          />
          <Button
            label={"Signup"}
            onClick={handleSubmit}
            variant={"primary"}
          />
        </div>
      </form>
    </div>
  );
}

export default Signup;
