const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRoutes = require("./routes/products");
const generateRoutes = require("./routes/generate");
const authRoutes = require("./routes/auth");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://product-desc-generator-z98a-git-main-dhruvverma09s-projects.vercel.app",
        "https://product-desc-generator-z98a.vercel.app"
    ]
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/generate", generateRoutes);

app.get("/", (req, res) => {
    res.json({ message: "HimShakti ListingAI Backend is running!", db: "MongoDB Atlas" });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});