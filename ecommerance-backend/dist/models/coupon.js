import mongoose from "mongoose";
const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, "Enter the coupon code"],
        unique: true,
    },
    amount: {
        type: Number,
        required: [true, "Enther the discount amount"]
    }
});
export const Coupon = mongoose.model("Coupon", couponSchema);
