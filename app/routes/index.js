const express = require("express");
const router = express.Router();
const userRouter = require("./userRouters");
const authRouter = require("./authRouters");
const projectRouter = require("./projectRouters");
const addressRouter = require("./addressRouters");

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/projects", projectRouter);
router.use("/", addressRouter);

module.exports = router;
