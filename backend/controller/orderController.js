const Order = require("../model/order.model");
const sendEmail = require("../utils/sendEmail");

const createOrder = async (req, res) => {
    try {
        const { products, address, totalAmount, paymentId } = req.body;

        if (!products || products.length === 0 ||!address || !totalAmount) {
            return res.status(400).json({
                message: "Invalid order data"
            });
        }

        const order = await Order.create({
            user: req.user._id,
            products,
            address,
            totalAmount,
            paymentId
        });

        try {
            await sendEmail({
                email: req.user.email,
                subject: "Order Created",
                message: "Your order has been created successfully"
            });
        } catch (emailError) {
            console.error("Failed to send order creation email:", emailError.message);
        }

        return res.status(201).json({
            message: "Order created successfully",
            order
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user._id
        }).populate("products.productId");

        return res.json(orders);

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

const getOrders = async(req, res) => {
    try{
        const orders = await Order.find().populate("user", "name email");
        return res.json(orders);

    }catch(err){
        return res.status(500).json({
            message: err.message
        })
    }   
}

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }
        order.status = status;
        await order.save();
        return res.json({
            message: "Order status updated",
            order
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate("user", "name email")
            .populate("products.productId");

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        // Only allow the order creator or an admin to access the order
        if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return res.status(403).json({
                message: "access denied"
            });
        }

        return res.json(order);

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {createOrder, getMyOrders, getOrders, getOrderById, updateOrderStatus};