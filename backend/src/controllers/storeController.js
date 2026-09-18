import User from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/** All routes here are for a logged-in company_admin acting on their own company's employees. */

// GET /api/store/employees?status=pending
export const listEmployees = asyncHandler(async (req, res) => {
  const filter = { role: "employee", company: req.user.company };
  if (req.query.status) filter.status = req.query.status;

  const employees = await User.find(filter).select("-passwordHash").sort({ createdAt: -1 });
  res.json({ employees });
});

async function findOwnPendingEmployee(req) {
  const employee = await User.findOne({
    _id: req.params.id,
    role: "employee",
    company: req.user.company,
  });
  if (!employee) {
    const err = new Error("Employee not found for your company");
    err.status = 404;
    throw err;
  }
  return employee;
}

// PATCH /api/store/employees/:id/approve
export const approveEmployee = asyncHandler(async (req, res) => {
  const employee = await findOwnPendingEmployee(req);
  employee.status = "approved";
  employee.reviewedBy = req.user._id;
  employee.reviewedAt = new Date();
  await employee.save();
  res.json({ employee: employee.toSafeJSON() });
});

// PATCH /api/store/employees/:id/reject
export const rejectEmployee = asyncHandler(async (req, res) => {
  const employee = await findOwnPendingEmployee(req);
  employee.status = "rejected";
  employee.rejectionReason = req.body.reason;
  employee.reviewedBy = req.user._id;
  employee.reviewedAt = new Date();
  await employee.save();
  res.json({ employee: employee.toSafeJSON() });
});
