import express from "express";
import { login, profile, register } from "../../../controllers/user-controller.js";
import { authLimiter } from "../../../utils/middlewares/rate-limiter.js";
const router = express.Router();
router.get("/profile", profile);
router.post("/login", authLimiter, login);
router.post("/register", authLimiter, register);
export default router;
