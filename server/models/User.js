import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
  },
  address: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
}, {
    timestamps: true,
});

const User = model("User", userSchema);

export default User;
