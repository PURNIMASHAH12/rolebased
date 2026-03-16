import express from "express";
import dotenv from "dotenv";
import mongodb from "./config/db.js";
import userRoutes from "./src/module/users/user.routes.js";
import bookRoutes from "./src/module/books/books.routes.js";

dotenv.config();

const app = express();
mongodb();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/book", bookRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Role-Based Library System API");
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    message: "Resource not found",
    success: false,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message || "Internal Server Error",
    success: false,
  });
});

app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`);
});
