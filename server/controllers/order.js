import Order from "./../models/Order.js";
import { responder } from "../utils/utils.js";

const postOrders = async (req, res) => {
};

const putOrders = async (req, res) => {
  const user = req.user;
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Invalid order ID format" });
  }

  try {
    const order = await Order.findById(id);
    console.log("Order Found:", order);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (
      user.role === "user" &&
      order.userId.toString() !== user._id.toString()
    ) {
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

    if (req.body.phone) {
      order.phone = req.body.phone;
    }

    if (user.role === "admin") {
      order.status = req.body.status;
      order.timeline = req.body.timeline;
    }
    await order.save();

    const updateOrder = await Order.findById(id);

    return res
      .status(200)
      .json({ message: "Order updated successfully", data: updateOrder });
  } catch (err) {
    console.error("Error:", err);
    return res.status(400).json({ message: "Error updating order" });
  }
};

const getOrderById = async (req, res) => {
  const user = req.user;
  const { id } = req.params;

  let order;

  try {
    order = await Order.findById(id)
      .populate("userId", "name email")
      .populate(
        "products.productId",
        "-shortDescription -longDescription -image -category -tags -__v -createdAt -updatedAt"
      )
      .populate("paymentId", "-__v -createdAt -updatedAt");

    if (!order) {
      return responder(res, false, "Order not found", null, 404);
    }
  } catch (error) {
    return responder(res, false, error.message, null, 400);
  }

  if (user._id != order.userId && user.role != "admin") {
    return responder(
      res,
      false,
      "You are not authorized to view this order",
      null,
      401
    );
  }

  return responder(res, true, "Order fetched successfully", order, 200);
};

const getOrdersByUserId = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (user.role != "admin" && user._id != id) {
    return responder(
      res,
      false,
      "You are not authorized to view this orders",
      null,
      401
    );
  }

  const orders = await Order.find({ userId: id })
    .populate("userId", "name email")
    .populate(
      "products.productId",
      "-shortDescription -longDescription -image -category -tags -__v -createdAt -updatedAt"
    )
    .populate("paymentId", "-__v -createdAt -updatedAt");

  return responder(res, true, "Orders fetched successfully", orders, 200);
};

export { postOrders, putOrders, getOrderById, getOrdersByUserId };
