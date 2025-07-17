const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { body } = require("express-validator");
const auth = require("../middleware/auth");

router.get("/", auth, userController.getUsers);
router.get("/profile/", auth, userController.profile);
router.get("/:id", userController.getUser);
router.post(
  "/",
  [
    body("user_email")
      .isEmail()
      .withMessage("Please enter a valid email address"),
  ],
  auth,
  userController.createUser
);
router.put("/update/", auth, userController.updateUser);
router.put("/delete/:id", auth, userController.deleteUser);

module.exports = router;
