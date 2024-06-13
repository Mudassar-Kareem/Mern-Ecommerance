import express from "express";
import { deleteProduct, getAdminProduct, getCatagories, getLatest, getSearch, getSingleProduct, newProduct, updateProducts } from "../controllers/product.js";
import { singleUpload } from "../middleware/multer.js";
import { adminOnly } from "../middleware/auth.js";
const app= express.Router();
app.post("/new",adminOnly, singleUpload, newProduct)
app.get("/latest",getLatest)
app.get("/category",getCatagories)
app.get("/admin-product", getAdminProduct)
app.get("/all", getSearch)
app.route("/:id").get(getSingleProduct).delete(adminOnly, deleteProduct).put(adminOnly, singleUpload,updateProducts)
export default app;
