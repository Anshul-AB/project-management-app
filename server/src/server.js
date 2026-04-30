import app from "./index.js";
import db from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is running. Use /api routes to interact with the backend.");
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is up and running",
  });
});

db()
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("DB connection failed:", error);
  });