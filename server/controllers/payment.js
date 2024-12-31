import Order from "../models/Order.js";
import Payment from "./../models/Payment.js";

const postPayment = async (req, res) => {
  const { orderId, amount, status, paymentMode, transactionId } = req.body;
  let order;
  try {
    order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (["delivered", "cancelled"].includes(order.status.toLowerCase())) {
      return res
        .status(400)
        .json({ message: "Order is already delivered or cancelled" });
    }
    const payment = new Payment({
      amount,
      status,
      paymentMode,
      transactionId,
    });
    const savedPayment = await payment.save();
    order.payment = savedPayment._id;
    order.paymentMode = paymentMode;
    order.timeline.push({ status: "Payment Compeleted", date: Date.now() });
    await order.save();

    res.status(201).json({
      message: "Payment created successfully",
      data: savedPayment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create payment",
      error: error.message,
    });
  }
};

export { postPayment };
