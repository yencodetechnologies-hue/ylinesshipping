import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDB } from "../config/db.js";
import User from "../models/User.js";
import mongoose from "mongoose";

async function run() {
  const { PLATFORM_ADMIN_NAME, PLATFORM_ADMIN_EMAIL, PLATFORM_ADMIN_PASSWORD } = process.env;
  if (!PLATFORM_ADMIN_EMAIL || !PLATFORM_ADMIN_PASSWORD) {
    throw new Error("Set PLATFORM_ADMIN_EMAIL and PLATFORM_ADMIN_PASSWORD in .env before seeding");
  }

  await connectDB();

  const email = PLATFORM_ADMIN_EMAIL.toLowerCase();
  const existing = await User.findOne({ email });
  if (existing) {
    console.log(`Platform admin already exists: ${email}`);
  } else {
    const passwordHash = await bcrypt.hash(PLATFORM_ADMIN_PASSWORD, 10);
    await User.create({
      role: "platform_admin",
      fullName: PLATFORM_ADMIN_NAME || "Platform Admin",
      email,
      passwordHash,
      status: "approved",
    });
    console.log(`Platform admin created: ${email}`);
  }

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
