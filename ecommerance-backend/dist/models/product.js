import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name"]
    },
    category: {
        type: String,
        required: [true, "Please enter category"],
        trim: true
    },
    photo: {
        type: String,
        required: [true, "Please enter photo"]
    },
    price: {
        type: Number,
        required: [true, "Please enter prize"]
    },
    stock: {
        type: Number,
        required: [true, "Please enter stock"]
    }
}, { timestamps: true });
export const products = mongoose.model("products", productSchema);
