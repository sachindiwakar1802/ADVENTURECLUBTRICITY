import express from "express";
import { uploadImage, deleteImage, upload } from "../controllers/imageController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/upload", protect, adminOnly, upload.single("image"), uploadImage);
router.delete("/delete/:public_id", protect, adminOnly, deleteImage);

export default router;
