const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const axios = require("axios");

// Create a new product
router.post("/addProduct", async (req, res) => {
    try {
        const newProduct = new Product({
            name: req.body.name,
            desc: req.body.desc,
            banner: req.body.banner,
            type: req.body.type,
            unit: req.body.unit,
            price: req.body.price,
            available: req.body.available,
            supplier: req.body.supplier,
            messageId: req.body.messageId,
            eventTimestamp: req.body.eventTimestamp,
        });

        const savedProduct = await newProduct.save();

        // Assuming you want to create an order in the Order Placement microservice when a product is added
        // Prepare the data for creating an order (you may modify this as per your actual requirements)
        const orderData = {
            orderId: "ORDER123", // Generate a unique order ID
            customerId: "CUSTOMER123", // Provide a valid customer ID
            amount: req.body.price * req.body.unit, // Calculate the order amount based on product price and quantity
            status: "PENDING", // Set the initial status as pending
            txnId: "TXN123", // Generate a unique transaction ID
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // Send a POST request to the Order Placement microservice to create the order
        const orderResponse = await axios.post("http://localhost:8072/order/addOrder", orderData);

        // Check if the order creation was successful
        if (orderResponse.status === 201) {
            // The order was created successfully
            res.json(savedProduct);
        } else {
            // Handle the case where order creation failed
            res.status(500).json({ error: "Unable to create the order" });
        }
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Unable to create the product" });
    }
});

// Get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Unable to fetch products" });
    }
});

// Get a specific product by ID
router.get("/:productId", async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: "Unable to fetch the product" });
    }
});

// Update a specific product by ID
router.put("/:productId", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.productId,
            req.body,
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: "Unable to update the product" });
    }
});

// Delete a specific product by ID
router.delete("/:productId", async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndRemove(req.params.productId);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Unable to delete the product" });
    }
});

module.exports = router;
