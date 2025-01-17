import React, { useState , useEffect} from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import { getCurrentuser } from "../utils/common";

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

  useEffect(()=>{
    const currentUser = getCurrentuser();
    if(currentUser){
      toast.success("Already Logged In , Redirecting to Dashboard");
      setTimeout(() => (window.location.href = "/dashboard"), 2000);
    }
  } , []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="mt-4  text-center text-3xl font-extrabold text-white">Create your account</h2>
      </div>
      <form className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-2xl">
        <Input
          label="Name"
          type="text"
          placeholder="Enter your name"
          val={signupData.name}
          onChange={(val) => setSignupData({ ...signupData, name: val }, setError(""))}
        />
        <Input
          label="Email address"
          type="email"
          placeholder="Enter your email"
          val={signupData.email}
          onChange={(val) => setSignupData({ ...signupData, email: val }, setError(""))}
        />
        <Input
          label="Phone"
          type="tel"
          placeholder="Enter your phone number"
          val={signupData.phone}
          onChange={(val) => setSignupData({ ...signupData, phone: val }, setError(""))}
        />
        <Input
          label="Address"
          type="text"
          placeholder="Enter your address"
          val={signupData.address}
          onChange={(val) => setSignupData({ ...signupData, address: val }, setError(""))}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          val={signupData.password}
          onChange={(val) => setSignupData({ ...signupData, password: val }, setError(""))}
        />
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Re-enter your password"
          val={signupData.rePassword}
          onChange={(val) => setSignupData({ ...signupData, rePassword: val }, setError(""))}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="mt-8 flex flex-col space-y-4">
          <Button
            label="Sign up"
            onClick={processSignup}
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
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-indigo-200 hover:text-indigo-100">
          Sign in
        </Link>
      </p>
    </div>
    <Toaster />
  </div>
  );
}

export default Signup;
