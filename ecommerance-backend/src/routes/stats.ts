import express from "express";
import { barChart, getAdminStats, lineChart, pieChart } from "../controllers/stats.js";

const app = express.Router();
app.get("/stats",getAdminStats);
app.get("/pie", pieChart);
app.get("/bar", barChart);
app.get("/line", lineChart);

export default app;