import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import { createEnquiry, listEnquiries, getEnquiry } from "../controllers/enquiryController.js";

const router = Router();

router.use(protect);

router.post("/", upload.array("attachments", 10), createEnquiry);
router.get("/", listEnquiries);
router.get("/:id", getEnquiry);

export default router;
