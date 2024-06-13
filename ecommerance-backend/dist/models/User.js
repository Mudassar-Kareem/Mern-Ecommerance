import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, "plz enter your ID"]
    },
    name: {
        type: String,
        required: [true, "plz enter your Name"]
    },
    email: {
        type: String,
        required: [true, "plz enter your Name"],
        unique: [true, "Email alredy exist"],
        validate: validator.default.isEmail
    },
    photo: {
        type: String,
        required: [true, "plz add your image"]
    },
    gender: {
        type: String,
        required: [true, "plz enter your gender"],
        enum: ["male", "female"]
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    dob: {
        type: Date,
        required: [true, "plz enter your Date of Birth"]
    }
}, { timestamps: true });
userSchema.virtual("age").get(function () {
    const today = new Date();
    const dob = this.dob;
    let age = today.getFullYear() - dob.getFullYear();
    if (today.getMonth() < dob.getMonth() ||
        (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
});
export const User = mongoose.model("User", userSchema);
