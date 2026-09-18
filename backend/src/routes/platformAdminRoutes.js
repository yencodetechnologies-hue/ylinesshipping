import { Router } from "express";
import { protect, requireRole } from "../middleware/auth.js";
import {
  listCompanies,
  approveCompany,
  rejectCompany,
  listUsers,
} from "../controllers/platformAdminController.js";

const router = Router();

router.use(protect, requireRole("platform_admin"));

router.get("/companies", listCompanies);
router.patch("/companies/:id/approve", approveCompany);
router.patch("/companies/:id/reject", rejectCompany);
router.get("/users", listUsers);

export default router;
