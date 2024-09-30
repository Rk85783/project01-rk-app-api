import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./db/index.js";
import router from "./routes/api.route.js";

const app = express();
app.use(cors());

// Database connection
connectDB();

// Middlewares
app.use(express.json());
app.use("/api", router);

const port = process.env.APP_PORT || 5001;
app.listen(port, () => {
  console.log(`${process.env.APP_NAME} is running at http://localhost:${port}`);
});
