import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createTask, deleteTask, getTasks, toggleTask } from "../controllers/taskController.js";

const router = express.Router()

router.post("/", authMiddleware, createTask);
router.get("/:projectId", authMiddleware, getTasks );
router.patch("/:id", authMiddleware, toggleTask )
router.delete("/:id", authMiddleware, deleteTask )

export default router