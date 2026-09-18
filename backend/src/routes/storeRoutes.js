import { Router } from "express";
import { protect, requireRole } from "../middleware/auth.js";
import { listEmployees, approveEmployee, rejectEmployee } from "../controllers/storeController.js";

const router = Router();

router.use(protect, requireRole("company_admin"));

router.get("/employees", listEmployees);
router.patch("/employees/:id/approve", approveEmployee);
router.patch("/employees/:id/reject", rejectEmployee);

export default router;
