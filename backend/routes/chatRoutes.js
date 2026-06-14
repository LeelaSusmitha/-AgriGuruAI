import express from "express";
import multer from "multer";

import { getChatResponse } from "../controllers/chatController.js";
import { analyzeImage } from "../controllers/imageController.js";

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

router.post("/", getChatResponse);

router.post(
  "/analyze-image",
  upload.single("image"),
  analyzeImage
);

export default router;