import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

function Signup() {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    rePassword: "",
  });
  const [error, setError] = useState("");

  const processSignup = async () => {
    toast.loading("Please Wait...");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/signup`,
        signupData
      );
      toast.dismiss();
      toast.success(response.data.message);

      setSignupData({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        rePassword: "",
      });
      setTimeout(() => (window.location.href = "/login"), 2000);
    } catch (error) {
      setError(error.response?.data?.message);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-500 py-4 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white mb-6">Signup</h1>
      <form className="w-full max-w-[600px] p-8 bg-white rounded-lg shadow-lg">
        <Input
          label={"Name"}
          type="text"
          placeholder="Enter your name"
          val={signupData.name}
          onChange={(val) =>
            setSignupData({ ...signupData, name: val }, setError(""))
          }
        />
        <Input
          label={"Email"}
          type="email"
          placeholder="Enter your email"
          val={signupData.email}
          onChange={(val) =>
            setSignupData({ ...signupData, email: val }, setError(""))
          }
        />
        <Input
          label={"Phone"}
          type="number"
          placeholder="Enter your phone number"
          val={signupData.phone}
          onChange={(val) =>
            setSignupData({ ...signupData, phone: val }, setError(""))
          }
        />
        <Input
          label={"Address"}
          type="text"
          placeholder="Enter your address"
          val={signupData.address}
          onChange={(val) =>
            setSignupData({ ...signupData, address: val }, setError(""))
          }
        />
        <Input
          label={"Password"}
          type="password"
          placeholder="Enter your password"
          val={signupData.password}
          onChange={(val) =>
            setSignupData({ ...signupData, password: val }, setError(""))
          }
        />
        <Input
          label={"Re-enter Password"}
          type="password"
          placeholder="Re-enter your password"
          val={signupData.rePassword}
          onChange={(val) =>
            setSignupData({ ...signupData, rePassword: val }, setError(""))
          }
        />
        <p className="text-red-500 text-sm">{error}</p>
        <p>Already have an account?{" "}
          <Link
            to="/login" className="text-blue-500 hover:text-blue-700 font-semibold">Login
          </Link>
        </p>
        <div className="flex justify-between mt-6">
          <Button
            label={"Cancel"}
            onClick={() => {
              window.location.href = "/";
            }}
            variant={"warning"}
          />
          <Button
            label={"Signup"}
            onClick={processSignup}
            variant={"primary"}
          />
        </div>
      </form>
      <Toaster />
    </div>
  );
}

export default Signup;
