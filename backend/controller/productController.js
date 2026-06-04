const Product = require("../model/product.model");
const cloudinary = require("../config/cloudinary");

// Get All Products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.json(products);
    } catch (error) {
        return res.status(500).json({
            message: "Server error"
        });
    }
};

// Get Product By ID
const getProductById = async (req, res) => {
    try {
        // req.body contains the data sent inside the request body, and ID is not part of request.
        // req.params.id = the product whose ID was provided in the URL.
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        return res.json(product);

    } catch (error) {
        return res.status(500).json({
            message: "Server error"
        });
    }
};

// Create Product
const createProduct = async (req, res) => {
    try {
        const {name,price, description,stock,category} = req.body;

        if (!name || !price) {
            return res.status(400).json({
                message: "Name and price are required"
            });
        }

        let imageUrl = "";

        // if a file was uploaded
        if (req.file) {
            // then upload the file to cloudinary.
            const result = await cloudinary.uploader.upload( req.file.path);
            // cloudinary stores that image and returns a secret_url, and controller saves it in mongoDB
            imageUrl = result.secure_url;
        }

        const product = new Product({
            name,
            price,
            description,
            stock,
            category,
            imageUrl
        });

        const savedProduct = await product.save();

        return res.status(201).json({
            message: "Product created successfully",
            product: savedProduct
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error"
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const {name,price, description,stock,category} = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "product not found"
            });
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.stock = stock || product.stock;
        product.category = category || product.category;

        if (req.file) {
            const result = await cloudinary.uploader.upload(
                req.file.path
            );

            product.imageUrl = result.secure_url;
        }

        const updatedProduct = await product.save();

        return res.json(updatedProduct);

    } catch (error) {
        return res.status(500).json({
            message: "server error"
        });
    }
};

const deleteProduct = async(req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(product){
            await product.deleteOne();
            res.json({
                message: "product removed successfully"
            })
        }else{
            res.status(404).json({
                message: "product not found"
            })
        }
    }catch(err){
        res.status(500).json({
            message: "internal server error"
        })
    }
}
module.exports = {getProducts, getProductById,createProduct,updateProduct,deleteProduct};