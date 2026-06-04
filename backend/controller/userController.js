const User = require('../model/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendEmail = require("../utils/sendEmail.js")

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if(!name || !email || !password){
        return res.status(400).json({
            message: "name, email and password are required"
        })
    } 
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = Math.floor(100000 + Math.random() * 900000);

    const user = await User.create({ 
        name, 
        email, 
        password:hashedPassword, 
        otp,
        otpExpiresIn : Date.now() + 10 * 60 * 1000 
    });
    if (user) {
      const message = `Your OTP is : ${otp}`;

      let emailSent = true;
      try {
        await sendEmail({
          email: user.email,
          subject: 'Welcome to SwiftCart - Your OTP',
          message
        });
      } catch (emailError) {
        console.error("Failed to send OTP email:", emailError.message);
        console.log(`[DEVELOPMENT] OTP for ${user.email} is: ${otp}`);
        emailSent = false;
      }

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
        emailSent,
        message: emailSent ? "OTP sent to email" : "Failed to send OTP email, check server console for OTP"
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verified) {
      return res.status(400).json({ message: "User is already verified" });
    }

    if (user.otp !== Number(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (Date.now() > user.otpExpiresIn) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    user.verified = true;
    user.otp = undefined;
    user.otpExpiresIn = undefined;
    await user.save();

    res.json({
      message: "Email verified successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      if (!user.verified) {
        return res.status(401).json({ message: "Please verify your email first" });
      }
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, verifyOtp, loginUser, getUsers };