import React, { useEffect, useState } from "react";
import { getCurrentuser } from "../utils/common";
import { User, Mail, UserCircle, LogOut, Truck } from "lucide-react";
import toast from "react-hot-toast";
import Button from "../components/Button";
import {Link} from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const user = getCurrentuser();
    console.log(user);

    if (user) {
      setUser(user);
    } else {
      toast.error("Please login to access this page");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }
  }, []);
   
  const logOut = () => {
    localStorage.removeItem("e-commerce-user-token");
    localStorage.removeItem("e-commerce-user-details");
    toast.success("Logged Out Successfully");
    setTimeout(() => {
      window.location.href = "/login";
    },2000);
  };
  return (
    <div className="container mx-auto px-4 py-8 w-full max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Welcome to Your Dashboard
      </h1>
      <div className="bg-white p-8 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between mb-4 bg-black text-white p-2 rounded-lg">
        <Link to='/user-orders' className="p-1">
         <Truck className="w-9 h-9 text-blue-500 inline" />
         <span className="text-md font-semibold text-blue-500 ">
          My Orders
          </span>
        </Link>
        <Link to='/user-orders' className="p-1">
         <Truck className="w-9 h-9 text-blue-500 inline" />
         <span className="text-md font-semibold text-blue-500 ">
          My Orders
          </span>
        </Link>
        <Link to='/orders' className="p-1">
         <Truck className="w-9 h-9 text-blue-500 inline" />
         <span className="text-md font-semibold text-blue-500 ">My Orders</span>
        </Link>
      </div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">User Profile</h2>
          <UserCircle className="w-10 h-10 text-blue-500" />
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-gray-700">
            <User className="w-5 h-5 text-blue-500" />
            <p className="text-lg">{user.name}</p>
          </div>
          <div className="flex items-center space-x-3 text-gray-700">
            <Mail className="w-5 h-5 text-blue-500" />
            <p className="text-lg">{user.email}</p>
          </div>
          <div className="flex items-center space-x-3 text-gray-700">
            <UserCircle className="w-5 h-5 text-blue-500" />
            <p className="text-lg capitalize">{user.role}</p>
          </div>
        </div>
        <div className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-1 px-4 rounded-lg font-semibold transform transition-all duration-300 hover:from-blue-600 hover:to-purple-700 hover:shadow-md flex items-center justify-center space-x-2">
        <LogOut className="w-7 h-7" />
        <Button label="Logout" variant="logout" onClick={logOut} />
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
