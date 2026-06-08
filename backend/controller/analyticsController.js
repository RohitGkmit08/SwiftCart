const User = require("../model/user.model");
const Product = require("../model/product.model");
const Order = require("../model/order.model");

const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: "user" });
        const totalOrders = await Order.countDocuments({});
        const totalProducts = await Product.countDocuments({});

        const orders = await Order.find();

        const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);

        return res.json({
            totalUsers,
            totalOrders,
            totalProducts,
            totalRevenue
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

module.exports = { getAdminStats };