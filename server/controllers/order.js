import Order from "./../models/Order.js";
import mongoose from "mongoose"; 

const postOrder = async (req, res) => {
  const { products, deliveryAddress, phone, paymentMethod } = req.body;
  if (!products || !deliveryAddress || !phone || !paymentMethod) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  let totalBill = 0;
  products.forEach((products) => {
    totalBill += products.price * products.quantity;
  });
  try {
    const order = new Order({
      userId: req.user._id,
      products,
      totalBill,
      deliveryAddress,
      phone,
      paymentMethod,
    });
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: "Error creating order" });
  }
};

const putOrders = async (req, res) => {
  const user = req.user;
  console.log("User:", user);

  const { id } = req.params;
  console.log("Order ID:", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid order ID format" });
  }

  try {
    const order = await Order.findById(id);
    console.log("Order Found:", order);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (user.role === "user" && order.userId.toString() !== user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You can only update your own orders" });
    }

    if (
      user.role === "user" &&
      req.body.status === "cancelled" &&
      order.status !== "delivered"
    ) {
      if (order.status === "delivered") {
        return res
          .status(403)
          .json({ message: "You can't cancel a delivered order" });
      } else {
        order.status = "cancelled";
        await order.save();
      }
    }

    if (user.role === "admin") {
      order.status = req.body.status;
      order.timeline = req.body.timeline;
      await order.save();
    }

    const updateOrder = await Order.findById(id);

    return res
      .status(200)
      .json({ message: "Order updated successfully", data: updateOrder });
  } catch (err) {
    console.error("Error:", err);
    return res.status(400).json({ message: "Error updating order" });
  }
};

export { postOrder, putOrders };
