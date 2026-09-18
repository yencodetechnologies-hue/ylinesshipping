import mongoose from "mongoose";

const { Schema } = mongoose;

const companySchema = new Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    name: { type: String, required: true, trim: true },

    businessType: { type: String, required: true },
    businessTypeOther: { type: String, trim: true },
    shippingCategories: { type: [String], default: [] },
    shippingCategoryOther: { type: String, trim: true },
    productCategories: { type: [String], default: [] },
    productCategoryOther: { type: String, trim: true },
    legalStatus: { type: String, required: true },
    legalStatusOther: { type: String, trim: true },
    gstNo: { type: String, trim: true, uppercase: true },
    panNo: { type: String, trim: true, uppercase: true },
    landline: { type: String, trim: true },

    address: {
      city: { type: String, required: true, trim: true },
      country: { type: String, required: true },
      countryOther: { type: String, trim: true },
      state: { type: String, required: true },
      stateOther: { type: String, trim: true },
      pincode: { type: String, required: true, trim: true },
      line: { type: String, required: true, trim: true },
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    rejectionReason: { type: String, trim: true },
    reviewedBy: { type: Schema.Types.ObjectId, ref: "User" },
    reviewedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Company", companySchema);
