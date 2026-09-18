import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Company from "../models/Company.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateToken } from "../utils/generateToken.js";
import { generateCompanyCode } from "../utils/companyCode.js";
import { isValidEmail, isValidPhone, isValidGstin, isValidPan, firstMissing } from "../utils/validators.js";

const SALT_ROUNDS = 10;

function buildAddress(body) {
  return {
    city: body.city,
    country: body.country,
    countryOther: body.countryOther,
    state: body.state,
    stateOther: body.stateOther,
    pincode: body.pincode,
    line: body.address,
  };
}

function assertSharedFields(body) {
  const missing = firstMissing(body, ["fullName", "email", "phone", "password"]);
  if (missing) throw badRequest(`Missing required field: ${missing}`);
  if (!isValidEmail(body.email)) throw badRequest("Enter a valid email");
  if (!isValidPhone(body.phone)) throw badRequest("Enter a valid mobile number");
  if (String(body.password).length < 6) throw badRequest("Password must be at least 6 characters");
}

function badRequest(message) {
  const err = new Error(message);
  err.status = 400;
  return err;
}

function respondWithSession(res, status, user, extra = {}) {
  const token = generateToken(user);
  res.status(status).json({ token, user: user.toSafeJSON(), ...extra });
}

// POST /api/auth/register/company
export const registerCompany = asyncHandler(async (req, res) => {
  const body = req.body;
  assertSharedFields(body);

  const missing = firstMissing(body, [
    "companyName",
    "designation",
    "businessType",
    "legalStatus",
    "city",
    "country",
    "state",
    "pincode",
    "address",
  ]);
  if (missing) throw badRequest(`Missing required field: ${missing}`);
  if (!isValidGstin(body.gstNo)) throw badRequest("Enter a valid 15-character GSTIN");
  if (!isValidPan(body.panNo)) throw badRequest("Enter a valid 10-character PAN");

  const existing = await User.findOne({ email: body.email.toLowerCase() });
  if (existing) throw Object.assign(new Error("Email already registered"), { status: 409 });

  const code = await generateCompanyCode();
  const company = await Company.create({
    code,
    name: body.companyName,
    businessType: body.businessType,
    businessTypeOther: body.businessTypeOther,
    shippingCategories: body.shippingCategories || [],
    shippingCategoryOther: body.shippingCategoryOther,
    productCategories: body.productCategories || [],
    productCategoryOther: body.productCategoryOther,
    legalStatus: body.legalStatus,
    legalStatusOther: body.legalStatusOther,
    gstNo: body.gstNo,
    panNo: body.panNo,
    landline: body.landline,
    address: buildAddress(body),
    status: "pending",
  });

  const passwordHash = await bcrypt.hash(body.password, SALT_ROUNDS);
  const user = await User.create({
    role: "company_admin",
    fullName: body.fullName,
    email: body.email.toLowerCase(),
    phone: body.phone,
    designation: body.designation,
    passwordHash,
    company: company._id,
    status: "approved", // the admin account itself is usable; the *company* listing is what's pending
  });

  respondWithSession(res, 201, user, {
    company: company.toObject(),
    message: "Registration received. Your company listing is pending platform verification.",
  });
});

// POST /api/auth/register/employee  (multipart/form-data: idProofFront, idProofBack)
export const registerEmployee = asyncHandler(async (req, res) => {
  const body = req.body;
  assertSharedFields(body);

  const missing = firstMissing(body, [
    "companyCode",
    "designation",
    "city",
    "country",
    "state",
    "pincode",
    "address",
    "idNumber",
  ]);
  if (missing) throw badRequest(`Missing required field: ${missing}`);

  const files = req.files || {};
  if (!files.idProofFront?.[0] || !files.idProofBack?.[0]) {
    throw badRequest("Both sides of the ID proof are required");
  }

  const company = await Company.findOne({ code: body.companyCode.trim().toUpperCase() });
  if (!company) throw badRequest("No company found with that company code");

  const existing = await User.findOne({ email: body.email.toLowerCase() });
  if (existing) throw Object.assign(new Error("Email already registered"), { status: 409 });

  const passwordHash = await bcrypt.hash(body.password, SALT_ROUNDS);
  const user = await User.create({
    role: "employee",
    fullName: body.fullName,
    email: body.email.toLowerCase(),
    phone: body.phone,
    designation: body.designation,
    passwordHash,
    company: company._id,
    address: buildAddress(body),
    idNumber: body.idNumber,
    idProofFront: files.idProofFront[0].filename,
    idProofBack: files.idProofBack[0].filename,
    status: "pending",
  });

  respondWithSession(res, 201, user, {
    message: "Your employee account request has been sent to the company admin for approval.",
  });
});

// POST /api/auth/register/individual  (multipart/form-data: idProofFront, idProofBack)
export const registerIndividual = asyncHandler(async (req, res) => {
  const body = req.body;
  assertSharedFields(body);

  const missing = firstMissing(body, [
    "city",
    "country",
    "state",
    "pincode",
    "address",
    "idNumber",
  ]);
  if (missing) throw badRequest(`Missing required field: ${missing}`);

  const productCategories = Array.isArray(body.productCategories)
    ? body.productCategories
    : body.productCategories
      ? [body.productCategories]
      : [];
  if (productCategories.length === 0) throw badRequest("Select at least one product category");

  const files = req.files || {};
  if (!files.idProofFront?.[0] || !files.idProofBack?.[0]) {
    throw badRequest("Both sides of the ID proof are required");
  }

  const existing = await User.findOne({ email: body.email.toLowerCase() });
  if (existing) throw Object.assign(new Error("Email already registered"), { status: 409 });

  const passwordHash = await bcrypt.hash(body.password, SALT_ROUNDS);
  const user = await User.create({
    role: "individual",
    fullName: body.fullName,
    email: body.email.toLowerCase(),
    phone: body.phone,
    passwordHash,
    address: buildAddress(body),
    idNumber: body.idNumber,
    idProofFront: files.idProofFront[0].filename,
    idProofBack: files.idProofBack[0].filename,
    productCategories,
    productCategoryOther: body.productCategoryOther,
    status: "approved",
  });

  respondWithSession(res, 201, user, {
    message: "Your individual account is ready.",
  });
});

// POST /api/auth/login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!isValidEmail(email) || !password) throw badRequest("Enter a valid email and password");

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user || !(await user.comparePassword(password))) {
    throw Object.assign(new Error("Invalid email or password"), { status: 401 });
  }

  if (user.role === "employee" && user.status !== "approved") {
    throw Object.assign(
      new Error(
        user.status === "pending"
          ? "Your account is still awaiting approval from your company admin."
          : "Your employee account request was rejected. Contact your company admin."
      ),
      { status: 403 }
    );
  }

  let company = null;
  if (user.company) company = await Company.findById(user.company);

  respondWithSession(res, 200, user, company ? { company: company.toObject() } : {});
});

// GET /api/auth/me
export const getMe = asyncHandler(async (req, res) => {
  let company = null;
  if (req.user.company) company = await Company.findById(req.user.company);
  res.json({ user: req.user.toSafeJSON(), company });
});
