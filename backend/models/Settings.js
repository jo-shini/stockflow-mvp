const mongoose = require("mongoose")

const settingsSchema = new mongoose.Schema({
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true,
    },
    defaultThreshold: {
        type: Number,
        default: 5
    },
}, { timestamps: true })



module.exports = mongoose.model("Organization", organizationSchema);
