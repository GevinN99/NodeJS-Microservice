const express = require("express");
const router = express.Router();
const db = require("../db");

// Add a new user
router.post("/addUser", async (req, res) => {
    try {
        const newUser = req.body;
        // Initialize cart, wishlist, and orders as empty JSON arrays
        newUser.cart = JSON.stringify([]);
        newUser.wishlist = JSON.stringify([]);
        newUser.orders = JSON.stringify([]);

        const [result] = await db.query("INSERT INTO users SET ?", [newUser]);
        const userId = result.insertId;

        res.json({ message: "User added successfully", userId });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// Get a user by ID
router.get("/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = rows[0];
        res.json(user);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Update a user by ID
router.put("/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedUserData = req.body;
        await db.query("UPDATE users SET ? WHERE id = ?", [updatedUserData, userId]);

        res.json({ message: "User updated successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get customer's wishlist by user ID
router.get("/:userId/wishlist", async (req, res) => {
    try {
        const userId = req.params.userId;
        const [rows] = await db.query("SELECT wishlist FROM users WHERE id = ?", [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const wishlistData = rows[0].wishlist;

        try {
            const wishlist = JSON.parse(wishlistData);
            res.json(wishlist);
        } catch (parseError) {
            console.error("Error parsing JSON:", parseError);
            res.status(500).json({ message: "Error parsing wishlist data" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});



// Delete a user by ID
router.delete("/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const [userRows] = await db.query("SELECT * FROM users WHERE id = ?", [userId]);

        if (userRows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        await db.query("DELETE FROM users WHERE id = ?", [userId]);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
