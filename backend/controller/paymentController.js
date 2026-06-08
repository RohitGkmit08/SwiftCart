const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// connect with razorpay and create an order. This order will be visible on razorpay dashboard.
const createOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || isNaN(amount)) {
            return res.status(400).json({
                message: "Valid amount is required"
            });
        }

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex")
        };

        const order = await razorpay.orders.create(options);

        return res.status(200).json(order);

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

// when payment will get deducted, 3 things will be generated , 1. order_id, 2. payment_id, 3.signature. These will be used to verify payment.
// How razorpay signature is generated -> 
// a. Razorpay created : order_Q123|pay_ABC456.
// b. then apply : sha256, using RAZORPAY_KEY_SECRET. 
// c. so signature becomes -> "razorpay_signature": "xyz789".
// d. backend generates the same signature -> const body = razorpay_order_id +"|" +razorpay_payment_id = "order_Q123|pay_ABC456".
// e. compare if(expectedSignature === razorpay_signature), if true then payement is genuine.
// f. after successful verification, save payment id and mark the order paid.

const verifyPayment = async (req, res) => {
    try {
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;
        const body = razorpay_order_id +"|"+razorpay_payment_id;
        const expectedSignature = crypto.createHmac("sha256",process.env.RAZORPAY_KEY_SECRET).update(body).digest("hex");
        const isAuthentic = expectedSignature === razorpay_signature;

        if (!isAuthentic) {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Payment verified successfully"
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};
module.exports = { createOrder, verifyPayment };