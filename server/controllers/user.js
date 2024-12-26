import User from "./../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const postSignup = async (req, res) => {
  const { name, password, rePassword, email, phone, address } = req.body;
  if (!name || !password || !rePassword || !email || !phone || !address) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  if (password !== rePassword) {
    return res
      .status(400)
      .json({ message: "Password and Confirm Password should be same" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    password: await bcrypt.hash(password, hashedPassword),
    email,
    phone,
    address,
  });
  try {
    const savedUser = await user.save();
    res.status(201).json({
      message: "User created successfully",
      data: {
        name: savedUser.name,
        email: savedUser.email,
        phone: savedUser.phone,
        address: savedUser.address,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message, succeess: false });
  }
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid Email or Password" });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(400).json({ message: "Invalid Email or Password" });
  }
  const token = jwt.sign(
    { id: user._id, email: user.email , role : user.role},
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
  res.setHeader("Authorization" , `Bearer ${token}`);
  res.json({ message: "Login Successfull", data: { token } });

};
export { postSignup, postLogin };
