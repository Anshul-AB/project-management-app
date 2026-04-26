import app from "./index.js"
import db from "./config/db.js";
import dotenv from "dotenv";
dotenv.config()

const PORT = process.env.PORT || 5000

db().then(()=>{
  console.log("MongoDB connected")
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

}).catch((error)=>{
  console.error("DB connection failed:", error);
})