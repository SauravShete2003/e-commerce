import Order from "./../models/Order.js";

const postOrder = async (req, res) => {
  const {
    products,
    deliveryAddress,
    phone,
    paymentMethod
  } = req.body;
  if (
    !products ||
    !deliveryAddress ||
    !phone ||
    !paymentMethod
  ) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  let totalBill = 0;
  products.forEach((products)=>{
    totalBill += products.price * products.quantity
  });
  try {
  const order = new Order({
    userId : req.user._id,
    products,
    totalBill,
    deliveryAddress,
    phone,
    paymentMethod,
  });
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error creating order" });
  }
};

export { postOrder };
