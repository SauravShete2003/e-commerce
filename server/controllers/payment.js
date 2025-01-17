import Order from "./../models/Order.js";
import Payment from "./../models/Payment.js";

const postPayments = async (req, res) => {
  const { orderId, amount, paymentMode, status, transactionId } = req.body;

  let order;

  try {
    order = await Order.findById(orderId);
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "This order does not exist",
    });
  }

  if (["delivered", "cancelled"].includes(order.status.toLowerCase())) {
    return res.status(400).json({
      success: false,
      message: `This order has already been ${order.status}`,
    });
  }

  const validStatuses = ["success", "failed"];
  const normalizedStatus = status.toLowerCase();

  if (!validStatuses.includes(normalizedStatus)) {
    return res.status(400).json({
      success: false,
      message: `Invalid status value. Allowed values are: ${validStatuses.join(", ")}`,
    });
  }

  const payment = new Payment({
    paymentMode,
    amount,
    transactionId,
    status: normalizedStatus,
  });

  try {
    const savedPayment = await payment.save();

    order.paymentId = savedPayment._id;
    order.paymentMode = paymentMode;

    if (normalizedStatus === "success") {
      order.timeline.push({ status: "Payment Completed", date: Date.now() });
    } else {
      order.timeline.push({ status: "Payment Failed", date: Date.now() });
    }

    await order.save();

    return res.json({
      success: true,
      message: normalizedStatus === "success" ? "Payment successful" : "Payment failed",
      data: savedPayment,
    });
  } catch (error) {
    console.error("Payment Save Error:", error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};


export { postPayments };