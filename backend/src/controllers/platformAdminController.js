import Company from "../models/Company.js";
import User from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// GET /api/admin/companies?status=pending
export const listCompanies = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;

  const companies = await Company.find(filter).sort({ createdAt: -1 });
  res.json({ companies });
});

async function findCompanyOr404(id) {
  const company = await Company.findById(id);
  if (!company) {
    const err = new Error("Company not found");
    err.status = 404;
    throw err;
  }
  return company;
}

// PATCH /api/admin/companies/:id/approve
export const approveCompany = asyncHandler(async (req, res) => {
  const company = await findCompanyOr404(req.params.id);
  company.status = "approved";
  company.reviewedBy = req.user._id;
  company.reviewedAt = new Date();
  await company.save();
  res.json({ company });
});

// PATCH /api/admin/companies/:id/reject
export const rejectCompany = asyncHandler(async (req, res) => {
  const company = await findCompanyOr404(req.params.id);
  company.status = "rejected";
  company.rejectionReason = req.body.reason;
  company.reviewedBy = req.user._id;
  company.reviewedAt = new Date();
  await company.save();
  res.json({ company });
});

// GET /api/admin/users?role=&status=
export const listUsers = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.role) filter.role = req.query.role;
  if (req.query.status) filter.status = req.query.status;

  const users = await User.find(filter).select("-passwordHash").sort({ createdAt: -1 });
  res.json({ users });
});
