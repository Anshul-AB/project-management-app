import express from "express";
import authRoutes from "./routes/authRoutes.js"
import projectRoutes from "./routes/projectRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"

const app = express();

app.use(express.json());

app.use("/api/auth",authRoutes)
app.use("/api/project", projectRoutes)
app.use("/api/task", taskRoutes)

export default app;