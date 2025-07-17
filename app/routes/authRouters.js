const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { body } = require("express-validator");

router.post(
  "/signup",
  [
    body("user_email")
      .isEmail()
      .withMessage("Please enter a valid email address"),
  ],
  authController.signup
);
router.post("/login", authController.login);

module.exports = router;
