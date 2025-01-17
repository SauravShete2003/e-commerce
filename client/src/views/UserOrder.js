import React, { useEffect, useState } from "react";
import { getCurrentuser, getJwtToken } from "../utils/common";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import OrderCard from "../components/OrderCard";
function UserOrder() {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);

  const loadUserOrders = async () => {
    if (!user?.id) return;
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/orders/user/${user.id}`,
        {
          headers: {
            Authorization: getJwtToken(),
          },
        }
      );
      setOrders(response.data.data);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    const user = getCurrentuser();
    if (user) {
      setUser(user);
    } else {
      toast.error("Please login to access this page");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }
  }, []);

  useEffect(() => {
    if (user) {
      loadUserOrders();
    }
  }, [user]);

  return (
    <div>
      <h1>My Order</h1>
      <p>
        Current User : {user.name} {user.email}
      </p>
      <div>
        {orders?.map((order) => {
          return <OrderCard key={order._id} order={order} />;
        })}
      </div>
      <Toaster />
    </div>
  );
}

export default UserOrder;
