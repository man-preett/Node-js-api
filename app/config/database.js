const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error("DB Connection Failed", error);
    process.exit(1);
  }
};
module.exports = connectDB;
