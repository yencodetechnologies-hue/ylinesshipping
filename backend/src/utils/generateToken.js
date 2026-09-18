import jwt from "jsonwebtoken";

export function generateToken(user) {
  return jwt.sign(
    { id: user._id.toString(), role: user.role, companyId: user.company ? user.company.toString() : null },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
}
