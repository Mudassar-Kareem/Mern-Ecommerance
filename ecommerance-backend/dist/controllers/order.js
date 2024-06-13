import { TryCatch } from "../middleware/error.js";
import Errorhandler from "../utils/utility-class.js";
import { Order } from "../models/order.js";
import { invalidateCache, reducedStock } from "../utils/features.js";
import { nodeCache } from "../app.js";
export const newOrder = TryCatch(async (req, res, next) => {
    const { shippingInfo, orderItems, user, subtotal, tax, discount, shippingCharges, total, } = req.body;
    if (!shippingCharges ||
        !shippingInfo ||
        !orderItems ||
        !user ||
        !subtotal ||
        !tax ||
        !discount) {
        return next(new Errorhandler("plz fill all field", 401));
    }
    await Order.create({
        shippingCharges,
        shippingInfo,
        user,
        orderItems,
        tax,
        discount,
        subtotal,
        total,
    });
    await reducedStock(orderItems);
    invalidateCache({
        order: true,
    });
    return res.status(201).json({
        success: true,
        message: "order created",
    });
});
export const myOrder = TryCatch(async (req, res, next) => {
    const { id: user } = req.query;
    const orders = await Order.find({ user });
    return res.status(200).json({
        success: true,
        orders,
    });
});
export const allOrder = TryCatch(async (req, res, next) => {
    const orders = await Order.find().populate("user", "name");
    return res.status(200).json({
        success: true,
        orders,
    });
});
export const singleOrder = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const key = `order-${id}`;
    let orders;
    if (nodeCache.has(key))
        orders = JSON.parse(nodeCache.get(key));
    else {
        orders = await Order.findById(id).populate("user", "name");
        if (!orders)
            return next(new Errorhandler("order not found", 404));
        nodeCache.set(key, JSON.stringify(orders));
    }
    return res.status(200).json({
        success: true,
        orders,
    });
});
export const processingOrder = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const key = `order-${id}`;
    let order;
    if (nodeCache.has(key))
        order = JSON.parse(nodeCache.get(key));
    else {
        order = await Order.findById(id);
        if (!order)
            return next(new Errorhandler("Order not found", 404));
        switch (order.status) {
            case "processing":
                order.status = "shipping";
                break;
            case "shipping":
                order.status = "deliverd";
                break;
            default:
                order.status = "deliverd";
                break;
        }
        nodeCache.set(key, JSON.stringify(order));
        await order.save();
    }
    invalidateCache({
        order: true,
    });
    return res.status(200).json({
        success: true,
        message: "order processing successfully"
    });
});
export const orderDeleted = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order)
        return next(new Errorhandler("Order not found", 404));
    await order.deleteOne();
    invalidateCache({
        order: true,
    });
    return res.status(200).json({
        success: true,
        message: "order deleted successfully"
    });
});
