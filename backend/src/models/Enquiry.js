import mongoose from "mongoose";

const { Schema } = mongoose;

const packageRowSchema = new Schema(
  {
    netWeight: Number,
    grossWeight: Number,
    length: Number,
    breadth: Number,
    height: Number,
  },
  { _id: false }
);

const enquirySchema = new Schema(
  {
    postedBy: { type: Schema.Types.ObjectId, ref: "User" },

    enquiryType: { type: String, required: true },
    shipment: { type: String, enum: ["IMPORT", "EXPORT", "DOMESTIC"], required: true },
    shipmentType: { type: String, required: true },
    shipmentTypeOther: { type: String, trim: true },

    departureCountry: { type: String, required: true },
    departureCountryOther: { type: String, trim: true },
    portOfLoading: { type: String, required: true },
    portOfLoadingOther: { type: String, trim: true },
    placeOfOrigin: { type: String, required: true },
    placeOfOriginOther: { type: String, trim: true },
    departurePostalCode: { type: String, required: true, trim: true },

    arrivalCountry: { type: String, required: true },
    arrivalCountryOther: { type: String, trim: true },
    portOfDischarge: { type: String, required: true },
    portOfDischargeOther: { type: String, trim: true },
    placeOfDelivery: { type: String, required: true },
    placeOfDeliveryOther: { type: String, trim: true },
    arrivalPostalCode: { type: String, required: true, trim: true },

    shipmentDate: { type: Date },
    incoTerm: { type: String, trim: true },
    incoTermOther: { type: String, trim: true },
    preferredLine: { type: String, trim: true },
    paymentType: { type: String, trim: true },
    paymentTypeOther: { type: String, trim: true },
    transitTime: { type: String, trim: true },
    shippingBillType: { type: String, trim: true },
    shippingBillTypeOther: { type: String, trim: true },

    commodity: { type: String, required: true, trim: true },
    hsCode: { type: String, trim: true },
    packageType: { type: String, required: true },
    packageTypeOther: { type: String, trim: true },
    noOfPackages: { type: Number, required: true },

    packages: { type: [packageRowSchema], default: [] },

    handlingInstruction: { type: String, trim: true },
    otherDescription: { type: String, trim: true },
    attachments: { type: [String], default: [] },

    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Enquiry", enquirySchema);
