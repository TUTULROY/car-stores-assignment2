"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarModel = void 0;
const mongoose_1 = require("mongoose");
const carSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    brand: {
        type: String,
        required: [true, 'Brand is required'],
    },
    model: {
        type: String,
        required: [true, 'Model is required'],
    },
    year: {
        type: String,
        required: [true, 'Year is required'],
        min: [1886, 'Year must be no earlier than 1886'], // Earliest car invention
    },
    price: {
        type: String,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive value'],
    },
    category: {
        type: String,
        enum: {
            values: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'],
            message: '{VALUE} is not a valid category',
        },
        required: [true, 'Category is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    quantity: {
        type: String,
        required: [true, 'Quantity is required'],
        min: [0, 'Quantity must be a positive value'],
    },
    inStock: {
        type: Boolean,
        required: [true, 'In-stock status is required'],
        default: true,
    },
});
exports.CarModel = (0, mongoose_1.model)('Car', carSchema);
