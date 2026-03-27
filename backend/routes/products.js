const express = require("express")
const Product = require("../models/Product");

const router = express.Router();

// create product
router.post("/", async (req, res) => {
    try {
        const {
            name, sku, quantity, costPrice, sellingPrice, lowStockThreshold,
        } = req.body;

        if (!name || !sku) {
            return res.status(400).json({
                message: "Name and SKU are required",
            });
        }

        // CHECK DUPLICATE SKU (IMPORTANT)
        const existingProduct = await Product.findOne({
            sku,
            organizationId: req.user.organizationId,
        });

        if (existingProduct) {
            return res.status(400).json({
                message: "SKU already exists",
            });
        }

        const product = await Product.create({
            name,
            sku,
            quantity: quantity || 0,
            costPrice,
            sellingPrice,
            lowStockThreshold,
            organizationId: req.user.organizationId,
        });

        res.status(201).json(product);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "server error" });
    }
});


// GET PRODUCTS

router.get("/", async (req, res) => {
    try {
        const products = await Product.find({
            organizationId: req.user.organizationId,
        }).sort({ createdAt: -1 });
        res.json(products);

    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }

});

// UPDATE PRODUCT

router.put("/:id", async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
            {
                _id: req.params.id,
                organizationId: req.user.organizationId,
            },

            req.body,
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);

    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }

});

// DELETE PRODUCT

router.delete("/:id", async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({
            _id: req.params.id,
            organizationId: req.user.organizationId,
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product deleted" });

    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;