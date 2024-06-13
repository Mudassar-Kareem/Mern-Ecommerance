import express from "express";
import { deleteUser, getAllUsers, getUser, newUser } from "../controllers/user.js";
import { adminOnly } from "../middleware/auth.js";
const app = express.Router();
// route /api/vi/user/new]
app.post("/new", newUser);
// route /api/v1/user/all
app.get("/all",adminOnly, getAllUsers)
// route /api/vi/user/dynamic ID
app.route("/:id").get(getUser).delete( adminOnly, deleteUser)

export default app;