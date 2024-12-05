"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    car: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
        min: [1, "Quantity must be at least 1"],
    },
    totalPrice: {
        type: String,
        required: true,
        min: [0, "Total price cannot be negative"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.OrderModel = (0, mongoose_1.model)('Car', orderSchema);
