const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const authMiddleware = require("./middleware/authMiddleware");

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("API Running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", authMiddleware, productRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
