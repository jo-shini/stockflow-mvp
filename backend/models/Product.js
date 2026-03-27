const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, require: true },
    sku: { type: String, require: true },
    description: { type: String },

    quantity: { type: Number, default: 0 },

    costPrice: { type: Number },
    sellingPrice: { type: Number },

    lowStockThreshold: { type: Number },

    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organozation",
        required: true
    },


}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
