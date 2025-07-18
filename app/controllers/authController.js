const jwt = require("jsonwebtoken");
const { Signup, Login } = require("../models/authModel");
const { validationResult } = require("express-validator");
const md5 = require("md5");

exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: "Please enter a valid email address",
    });
  }
  try {
    const password = md5(req.body.user_password);
    const data = { ...req.body, user_password: password };
    await Signup.insertOne(data);
    return res.status(201).json({
      status: true,
      message: "User created successfully",
    });
  } catch (err) {
    if (err.code === 11000 && err.keyPattern?.user_email) {
      return res.status(400).json({
        status: false,
        message: "Email already registered",
      });
    }
    res.status(500).json({
      status: false,
      message: "User is not created",
      error: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await Login.findOne({ user_email: req.body.user_email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const password = md5(req.body.user_password);
    if (password !== user.user_password) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const access_token = jwt.sign(
      { user: { _id: user._id, email: user.user_email } },
      "huhuihiuh",
      { expiresIn: "1h" }
    );
    return res.status(200).json({
      status: true,
      message: "Login successful",
      data: {access_token:access_token},
    });
  } catch {
    res.status(500).json({ message: err.message });
  }
};
