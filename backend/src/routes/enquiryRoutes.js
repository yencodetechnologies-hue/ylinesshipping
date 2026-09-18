import { Router } from "express";
import { protect, optionalAuth } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import { createEnquiry, listEnquiries, getEnquiry } from "../controllers/enquiryController.js";

const router = Router();

router.post("/", optionalAuth, upload.array("attachments", 10), createEnquiry);
router.get("/", protect, listEnquiries);
router.get("/:id", protect, getEnquiry);

export default router;
