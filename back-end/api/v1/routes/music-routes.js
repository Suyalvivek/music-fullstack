import express from "express";
const router = express.Router();
router.get("/all-songs", (req, res) => {
  res.send("All Songs");
});
router.get("/search-songs", (req, res) => {
  res.send("Search Songs");
});
router.post("/add-song", (req, res) => {});
router.post("/update-song", (req, res) => {});
export default router;
