import express from "express";
const router = express.Router();
router.get("/profile", (req, res) => {
  res.send("User Profile");
});
router.post("/login", (req, res) => {
  res.send("User Login");
});
router.post("/register", (req, res) => {
  res.send("User Register");
});
export default router;
