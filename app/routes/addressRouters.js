const express = require("express");
const router = express.Router();
const addressController = require("../controllers/addressController");
const auth = require("../middleware/auth");

router.get("/country", auth, addressController.getCountries);
router.post("/state", auth, addressController.getStates);
router.post("/city", auth, addressController.getCities);

module.exports = router;
