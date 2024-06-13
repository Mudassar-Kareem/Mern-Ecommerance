import { stripe } from "../app.js";
import { TryCatch } from "../middleware/error.js";
import { Coupon } from "../models/coupon.js";
import Errorhandler from "../utils/utility-class.js";
export const createPaymentIntent = TryCatch(async (req, res, next) => {
    const { amount } = req.body;
    if (!amount)
        return next(new Errorhandler("Please enter amount", 400));
    const paymentIntent = await stripe.paymentIntents.create({
        amount: Number(amount) * 100,
        currency: "pkr",
    });
    return res.status(201).json({
        success: true,
        clientSecret: paymentIntent.client_secret,
    });
});
export const newCoupon = TryCatch(async (req, res, next) => {
    const { amount, code } = req.body;
    if (!code || !amount)
        return next(new Errorhandler("Plz enter both coupon and amount", 401));
    await Coupon.create({
        amount, code
    });
    return res.status(201).json({
        success: true,
        message: `coupon ${code} created successfully`
    });
});
export const discount = TryCatch(async (req, res, next) => {
    const { coupon } = req.query;
    const discount = await Coupon.findOne({ code: coupon });
    if (!discount)
        return next(new Errorhandler("Invalid Coupon", 401));
    return res.status(200).json({
        success: true,
        discount: discount.amount
    });
});
export const allCoupon = TryCatch(async (req, res, next) => {
    const coupon = await Coupon.find({});
    return res.status(200).json({
        success: true,
        coupon
    });
});
export const couponDelete = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const couponDelete = await Coupon.findById(id);
    if (!couponDelete)
        return next(new Errorhandler("Saly Id tu thek likh", 404));
    await couponDelete.deleteOne();
    return res.status(200).json({
        success: true,
        message: `coupon ${id} deleted successfully`
    });
});
