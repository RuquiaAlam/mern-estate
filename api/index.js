import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
dotenv.config();
const app = express();
const PORT = 3000;
app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
app.get("/", (req, res) => {
  res.json({ message: "API is working!" });
});
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MONGODB");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error!";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
