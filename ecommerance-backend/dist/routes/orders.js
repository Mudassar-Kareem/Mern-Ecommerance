import express from "express";
import { allOrder, myOrder, newOrder, orderDeleted, processingOrder, singleOrder } from "../controllers/order.js";
const app = express.Router();
app.post("/new", newOrder);
app.get("/my", myOrder);
app.get("/all", allOrder);
app.route("/:id").get(singleOrder).put(processingOrder).delete(orderDeleted);
export default app;
