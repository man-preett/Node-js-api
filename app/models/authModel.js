const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
  user_first_name: { type: String, required: true },
  user_last_name: { type: String, required: true },
  user_email: { type: String, required: true, unique: true },
  user_password: { type: String, required: true },
});

const loginSchema = new mongoose.Schema({
  user_email: { type: String, required: true },
  user_password: { type: String, required: true },
});

const Signup = mongoose.model("Signup", signupSchema, "em_users");
const Login = mongoose.model("Login", loginSchema, "em_users");

module.exports = { Signup, Login };
