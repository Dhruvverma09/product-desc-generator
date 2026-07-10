const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const rateLimit = require("express-rate-limit");
const User = require("../models/User");

// Rate limiter — max 5 requests per 15 min
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: { success: false, message: "Too many attempts. Try again after 15 minutes." },
});

// Validation rules
const registerValidation = [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

const loginValidation = [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
];

// POST /api/auth/register
router.post("/register", authLimiter, registerValidation, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: errors.array()[0].msg });
        }

        const { name, email, password } = req.body;

        // Check duplicate email
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ success: false, message: "Email already registered." });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const user = await User.create({ name, email, password: hashedPassword });

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, email: user.email, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(201).json({
            success: true,
            message: "Registration successful!",
            data: { token, user: { id: user._id, name: user.name, email: user.email } }
        });
    } catch (err) { next(err); }
});

// POST /api/auth/login
router.post("/login", authLimiter, loginValidation, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: errors.array()[0].msg });
        }

        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email or password." });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid email or password." });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, email: user.email, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            success: true,
            message: "Login successful!",
            data: { token, user: { id: user._id, name: user.name, email: user.email } }
        });
    } catch (err) { next(err); }
});

// GET /api/auth/me — protected route
router.get("/me", require("../middleware/authMiddleware"), async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.status(200).json({ success: true, data: user });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// POST /api/auth/logout
router.post("/logout", (req, res) => {
    res.status(200).json({ success: true, message: "Logged out successfully." });
});

module.exports = router;