const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Organization = require("../models/Organization");

const router = express.Router();

// Signup

router.post("/signup", async (req, res) => {
    try {
        const { email, password, organizationName } = req.body;

        if (!email || !password || !organizationName) {
            return res.status(400).json({
                message: "Email, password and organization name are required",
            });
        }
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters",
            });
        }

        // check user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // create org
        const org = await Organization.create({
            name: organizationName.trim(),
        });

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const user = await User.create({
            email,
            password: hashedPassword,
            organizationId: org._id,
        });
        res.status(201).json({ message: "User created successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// Login

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentails" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentails" });
        }

        const token = jwt.sign({
            userId: user._id,
            organizationId: user.organizationId,
        },
            process.env.JWT_SECRET,
            { expiresIn: "1d" });
        res.json({ token });

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router;