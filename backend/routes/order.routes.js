const express = require("express");
const router = express.Router();

const {createOrder,getOrderById,getOrders,updateOrderStatus,getMyOrders} = require("../controller/orderController");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

router.post("/", protect, createOrder);

router.get("/", protect, admin, getOrders);

router.get("/myorders", protect, getMyOrders);

router.get("/:id", protect, getOrderById);

router.put("/:id/status", protect, admin, updateOrderStatus);

module.exports = router;