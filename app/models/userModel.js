const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  user_first_name: { type: String, required: true },
  user_last_name: { type: String, required: true },
  user_email: { type: String, required: true, unique: true },
  user_password: { type: String, required: true },
  user_age: { type: Number, default: null },
  user_gender: { type: String, default: null },
  user_country: { type: String, default: null },
  user_state: { type: String, default: null },
  user_city: { type: String, default: null },
  user_isdeleted: { type: Number, default: 0 },
});

const userUpdateSchema = new mongoose.Schema({
  user_first_name: { type: String, required: true },
  user_last_name: { type: String, required: true },
  user_age: { type: Number, required: true },
  user_gender: { type: String, required: true },
  user_country: { type: String, required: true },
  user_state: { type: String, required: true },
  user_city: { type: String, required: true },
});

const User = mongoose.model("User", userSchema, "em_users");
const UserUpdate = mongoose.model("UserUpdate", userUpdateSchema, "em_users");

module.exports = { User, UserUpdate };
