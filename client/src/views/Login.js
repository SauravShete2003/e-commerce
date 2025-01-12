import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const processLogin = async () => {
    toast.loading("Please Wait...");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        loginData
      );
      localStorage.setItem("e-commerce-user-token", response.data.token);
      toast.dismiss();
      toast.success(response.data.message);

      setLoginData({  email: "",  password: "" });

      setTimeout(() => (window.location.href = "/dashboard"), 2000);

    } catch (error) {
      setError(error.response?.data?.message);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-500 py-4 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white mb-6">Login</h1>
      <form className="w-full max-w-[600px] p-8 bg-white rounded-lg shadow-lg">
        <Input
          label={"Email"}
          type="email"
          placeholder="Enter your email"
          val={loginData.email}
          onChange={(val) =>
            setLoginData({ ...loginData, email: val }, setError(""))
          }
        />
        <Input
          label={"Password"}
          type="password"
          placeholder="Enter your password"
          val={loginData.password}
          onChange={(val) =>
            setLoginData({ ...loginData, password: val }, setError(""))
          }
        />
        <p className="text-red-500 text-sm">{error}</p>
        <p>
          Don't have an account?{" "}
          <Link
            to="/signup" className="text-blue-500 hover:text-blue-700 font-semibold">Signup
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
            label={"Login"}
            onClick={processLogin}
            variant={"primary"}
          />
        </div>
      </form>
      <Toaster />
    </div>
  );
}

export default Login;
