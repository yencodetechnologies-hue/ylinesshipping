import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["platform_admin", "company_admin", "employee", "individual"],
      required: true,
    },

    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    passwordHash: { type: String, required: true },

    designation: { type: String, trim: true },

    // company_admin and employee belong to a Company ("store")
    company: { type: Schema.Types.ObjectId, ref: "Company" },

    // employee + individual: personal address & ID proof
    address: {
      city: { type: String, trim: true },
      country: { type: String },
      countryOther: { type: String, trim: true },
      state: { type: String },
      stateOther: { type: String, trim: true },
      pincode: { type: String, trim: true },
      line: { type: String, trim: true },
    },
    idNumber: { type: String, trim: true },
    idProofFront: { type: String },
    idProofBack: { type: String },

    // individual only
    productCategories: { type: [String], default: [] },
    productCategoryOther: { type: String, trim: true },

    // employee approval by their company_admin; platform_admin/company_admin/individual are active on creation
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "approved",
    },
    rejectionReason: { type: String, trim: true },
    reviewedBy: { type: Schema.Types.ObjectId, ref: "User" },
    reviewedAt: { type: Date },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.passwordHash);
};

userSchema.methods.toSafeJSON = function toSafeJSON() {
  const obj = this.toObject();
  delete obj.passwordHash;
  return obj;
};

export default mongoose.model("User", userSchema);
