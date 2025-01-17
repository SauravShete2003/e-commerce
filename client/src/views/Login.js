import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import { getCurrentuser } from "../utils/common";

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
      localStorage.setItem("e-commerce-user-details", JSON.stringify(response.data.data));
      toast.dismiss();
      toast.success(response.data.message);

      setLoginData({  email: "",  password: "" });

      setTimeout(() => (window.location.href = "/dashboard"), 2000);

    } catch (error) {
      setError(error.response?.data?.message);
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(()=>{
    const currentUser = getCurrentuser();
    if(currentUser){
      toast.success("Already Logged In , Redirecting to Dashboard");
      setTimeout(() => (window.location.href = "/dashboard"), 2000);
    }
  } , []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Sign in to your account</h2>
      </div>
      <form className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-2xl">
        <Input
          label="Email address"
          type="email"
          placeholder="Enter your email"
          val={loginData.email}
          onChange={(val) => setLoginData({ ...loginData, email: val }, setError(""))}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          val={loginData.password}
          onChange={(val) => setLoginData({ ...loginData, password: val }, setError(""))}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </Link>
          </div>
        </div>
        <div className="mt-8 flex flex-col space-y-4">
          <Button
            label="Sign in"
            onClick={processLogin}
            variant="primary"
            className="w-full"
          />
          <Button
          label="Cancel"
          onClick={() => (window.location.href = "/")}
          variant="warning"
          className="w-full"
        />
        </div>
      </form>
      <p className="mt-2 text-center text-sm text-white">
        Don't have an account?{" "}
        <Link to="/signup" className="font-medium text-indigo-200 hover:text-indigo-100">
          Sign up
        </Link>
      </p>
    </div>
    <Toaster />
  </div>
  );
}

export default Login;
