const express = require("express");
const router = express.Router();
const {registerUser, verifyOtp, loginUser, getUsers} = require("../controller/userController");
const {protect} = require("../middleware/authMiddleware.js");
const {admin} = require("../middleware/adminMiddleware.js");

router.post("/register", registerUser);
router.post("/verify", verifyOtp);
router.post("/login", loginUser);
router.get("/users", protect, admin,getUsers);

module.exports = router;