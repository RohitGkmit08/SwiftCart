const express = require("express");
const router = express.Router();

const multer = require("multer");
// multer is a middleware used to handle formdata, 
// It is primarily used to process incoming file uploads from client-side forms and make the uploaded file data easily accessible on your server.

const upload = multer({ dest: "uploads/" });
//Whenever a file is uploaded, save it temporarily inside the uploads folder

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const {getProducts,getProductById,createProduct,updateProduct,deleteProduct} = require("../controller/productController");

// Get all products
router.get("/", getProducts);

// Create product (Admin only)
router.post("/",protect,admin,upload.single("image"),createProduct);

// Get single product
router.get("/:id", getProductById);

// Update product (Admin only)
router.put("/:id",protect,admin,upload.single("image"),updateProduct);

// Delete product (Admin only)
router.delete("/:id",protect,admin,deleteProduct
);

module.exports = router;