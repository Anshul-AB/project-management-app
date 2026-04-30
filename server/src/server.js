// import app from "./index.js";
// import db from "./config/db.js";
// import dotenv from "dotenv";

// dotenv.config();

// const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   res.send("API is running. Use /api routes to interact with the backend.");
// });

// app.get("/health", (req, res) => {
//   res.json({
//     status: "OK",
//     message: "Server is up and running",
//   });
// });

// db()
//   .then(() => {
//     console.log("MongoDB connected");

//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error("DB connection failed:", error);
//   });

import express from "express";

console.log("ENV CHECK:");
console.log("MONGODB_STR:", process.env.MONGODB_STR);
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("PORT:", process.env.PORT);

const app = express();

app.get("/", (req, res) => {
  res.send("SERVER RUNNING");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server started on", PORT);
});