import { Router } from "express";
import { upload } from "../middleware/upload.js";
import { protect } from "../middleware/auth.js";
import {
  registerCompany,
  registerEmployee,
  registerIndividual,
  login,
  getMe,
} from "../controllers/authController.js";

const router = Router();

const idProofFields = upload.fields([
  { name: "idProofFront", maxCount: 1 },
  { name: "idProofBack", maxCount: 1 },
]);

router.post("/register/company", registerCompany);
router.post("/register/employee", idProofFields, registerEmployee);
router.post("/register/individual", idProofFields, registerIndividual);
router.post("/login", login);
router.get("/me", protect, getMe);

export default router;
