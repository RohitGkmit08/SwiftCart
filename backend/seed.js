const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./model/user.model");
const Product = require("./model/product.model");
const Order = require("./model/order.model");

const products = [
  {
    name: "Sony WH-1000XM4 Wireless Headphones",
    description: "Industry-leading noise-canceling wireless over-ear headphones with Alexa voice control, built-in mic, and up to 30 hours of battery life.",
    price: 19999,
    category: "Electronics",
    stock: 50,
    rating: 4.8,
    numReviews: 124,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60"
  },
  {
    name: "Apple Watch Series 8 GPS",
    description: "Advanced health features including temperature sensing, blood oxygen measurement, and ECG. Dust-resistant, swim-proof, and crack-resistant.",
    price: 34999,
    category: "Electronics",
    stock: 30,
    rating: 4.7,
    numReviews: 89,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60"
  },
  {
    name: "JBL Flip 6 Portable Bluetooth Speaker",
    description: "Eco-friendly design with powerful sound, 2-way speaker system, IP67 waterproof and dustproof design, and 12 hours of playtime.",
    price: 9999,
    category: "Electronics",
    stock: 100,
    rating: 4.5,
    numReviews: 210,
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60"
  },
  {
    name: "Nike Air Max 270",
    description: "Nike's first lifestyle Air Max delivers style, comfort, and big attitude. Features a large Air unit for soft cushioning underfoot.",
    price: 11999,
    category: "Fashion",
    stock: 40,
    rating: 4.6,
    numReviews: 78,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60"
  },
  {
    name: "Genuine Leather Bifold Wallet",
    description: "Handcrafted from premium full-grain leather, featuring multiple card slots, an ID window, and a spacious bill compartment.",
    price: 1499,
    category: "Fashion",
    stock: 150,
    rating: 4.3,
    numReviews: 45,
    imageUrl: "https://images.unsplash.com/photo-1627124765135-562305230915?w=500&auto=format&fit=crop&q=60"
  },
  {
    name: "Stainless Steel Insulated Water Bottle",
    description: "Double-wall insulation keeps beverages cold for up to 24 hours or hot for up to 12 hours. Sweat-free and leak-proof.",
    price: 999,
    category: "Home & Kitchen",
    stock: 200,
    rating: 4.4,
    numReviews: 156,
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60"
  },
  {
    name: "Premium Espresso Maker Machine",
    description: "Compact 15-bar pump pressure espresso and cappuccino maker. Includes manual steam wand for rich, creamy milk froth.",
    price: 8499,
    category: "Home & Kitchen",
    stock: 15,
    rating: 4.2,
    numReviews: 32,
    imageUrl: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&auto=format&fit=crop&q=60"
  },
  {
    name: "Adjustable Dumbbell Set (20kg)",
    description: "Heavy-duty steel plates with a textured chrome handle for secure grip. Perfect for home strength training and full-body workouts.",
    price: 4999,
    category: "Fitness",
    stock: 25,
    rating: 4.7,
    numReviews: 64,
    imageUrl: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=500&auto=format&fit=crop&q=60"
  }
];

const seedDB = async () => {
  try {
    console.log("Connecting to Database...");
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is missing!");
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected successfully!");

    // Clear existing data
    console.log("Clearing existing data (Orders, Products, Users)...");
    await Order.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log("Existing data cleared successfully!");

    // Create seed users
    console.log("Hashing user passwords and preparing seed users...");
    const salt = await bcrypt.genSalt(10);
    const hashedPasswordAdmin = await bcrypt.hash("adminpassword", salt);
    const hashedPasswordUser = await bcrypt.hash("userpassword", salt);

    const users = [
      {
        name: "Admin User",
        email: "admin@swiftcart.com",
        password: hashedPasswordAdmin,
        role: "admin",
        verified: true
      },
      {
        name: "John Doe",
        email: "john@swiftcart.com",
        password: hashedPasswordUser,
        role: "user",
        verified: true
      }
    ];

    console.log("Seeding users...");
    const createdUsers = await User.insertMany(users);
    console.log(`Successfully seeded ${createdUsers.length} users!`);

    console.log("Seeding products...");
    const createdProducts = await Product.insertMany(products);
    console.log(`Successfully seeded ${createdProducts.length} products!`);

    console.log("Database seeded successfully! ");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database :", error);
    process.exit(1);
  }
};

seedDB();
