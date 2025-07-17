const { ObjectId } = require("mongodb");
const { User, UserUpdate } = require("../models/userModel");
const md5 = require("md5");
const { validationResult } = require("express-validator");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ user_isdeleted: { $ne: 1 } });
    return res.status(200).json({
      status: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: "User not found",
      error: err.message,
    });
  }
};

exports.profile = async (req, res) => {
  try {
    const user_id = req.user._id;
    const user = await User.findOne({ _id: user_id });

    return res.status(200).json({
      status: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Internal server ",
      error: err.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const id = new ObjectId(String(req.params.id));
    const user = await User.findOne({ _id: id, user_isdeleted: { $ne: 1 } });
    if (!user) {
      res.status(404).json({
        status: false,
        message: "User not found",
        error: err.message,
      });
    }
    return res.status(200).json({
      status: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

exports.createUser = async (req, res) => {
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
    await User.insertOne(data);
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

exports.updateUser = async (req, res) => {
  try {
    const id = req.user._id;
    const existing_user = await User.findOne({ _id: id });
    if (!existing_user) {
      res.status(404).json({
        status: false,
        message: "User not found",
      });
    }
    const user = await UserUpdate.updateOne({ _id: id }, { $set: req.body });
    res.status(200).json({
      status: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = new ObjectId(String(req.params.id));
    const existing_user = await User.findOne({ _id: id });
    if (!existing_user) {
      res.status(404).json({
        status: false,
        message: "User not found",
      });
    }
    const user = await User.updateOne(
      { _id: id },
      { $set: { user_isdeleted: 1 } }
    );
    res.status(200).json({
      status: true,
      message: "User deleted successfully",
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      status: true,
      message: "User not found",
      error: err.message,
    });
  }
};
