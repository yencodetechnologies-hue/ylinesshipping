import Enquiry from "../models/Enquiry.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { firstMissing } from "../utils/validators.js";

function badRequest(message) {
  const err = new Error(message);
  err.status = 400;
  return err;
}

const REQUIRED_FIELDS = [
  "enquiryType",
  "shipment",
  "shipmentType",
  "departureCountry",
  "portOfLoading",
  "placeOfOrigin",
  "departurePostalCode",
  "arrivalCountry",
  "portOfDischarge",
  "placeOfDelivery",
  "arrivalPostalCode",
  "commodity",
  "packageType",
  "noOfPackages",
];

// POST /api/enquiries  (auth optional; multipart/form-data with optional "attachments" files)
export const createEnquiry = asyncHandler(async (req, res) => {
  const body = req.body;
  const missing = firstMissing(body, REQUIRED_FIELDS);
  if (missing) throw badRequest(`Missing required field: ${missing}`);

  let packages = [];
  if (body.packages) {
    try {
      packages = typeof body.packages === "string" ? JSON.parse(body.packages) : body.packages;
    } catch {
      throw badRequest("packages must be valid JSON");
    }
  }

  const files = req.files || [];

  const enquiry = await Enquiry.create({
    postedBy: req.user ? req.user._id : undefined,
    enquiryType: body.enquiryType,
    shipment: body.shipment,
    shipmentType: body.shipmentType,
    shipmentTypeOther: body.shipmentTypeOther,
    departureCountry: body.departureCountry,
    departureCountryOther: body.departureCountryOther,
    portOfLoading: body.portOfLoading,
    portOfLoadingOther: body.portOfLoadingOther,
    placeOfOrigin: body.placeOfOrigin,
    placeOfOriginOther: body.placeOfOriginOther,
    departurePostalCode: body.departurePostalCode,
    arrivalCountry: body.arrivalCountry,
    arrivalCountryOther: body.arrivalCountryOther,
    portOfDischarge: body.portOfDischarge,
    portOfDischargeOther: body.portOfDischargeOther,
    placeOfDelivery: body.placeOfDelivery,
    placeOfDeliveryOther: body.placeOfDeliveryOther,
    arrivalPostalCode: body.arrivalPostalCode,
    shipmentDate: body.shipmentDate || undefined,
    incoTerm: body.incoTerm,
    incoTermOther: body.incoTermOther,
    preferredLine: body.preferredLine,
    paymentType: body.paymentType,
    paymentTypeOther: body.paymentTypeOther,
    transitTime: body.transitTime,
    shippingBillType: body.shippingBillType,
    shippingBillTypeOther: body.shippingBillTypeOther,
    commodity: body.commodity,
    hsCode: body.hsCode,
    packageType: body.packageType,
    packageTypeOther: body.packageTypeOther,
    noOfPackages: body.noOfPackages,
    packages,
    handlingInstruction: body.handlingInstruction,
    otherDescription: body.otherDescription,
    attachments: files.map((f) => f.filename),
  });

  res.status(201).json({ enquiry });
});

// GET /api/enquiries — company_admin/employee/platform_admin see all open enquiries;
// individuals and company accounts also get an implicit "mine" filter via ?mine=true.
export const listEnquiries = asyncHandler(async (req, res) => {
  const filter = {};

  if (req.user.role === "individual" || req.query.mine === "true") {
    filter.postedBy = req.user._id;
  }
  if (req.query.enquiryType) filter.enquiryType = req.query.enquiryType;
  if (req.query.shipment) filter.shipment = req.query.shipment;
  if (req.query.status) filter.status = req.query.status;

  const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 }).limit(200);
  res.json({ enquiries });
});

// GET /api/enquiries/:id
export const getEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id);
  if (!enquiry) {
    const err = new Error("Enquiry not found");
    err.status = 404;
    throw err;
  }

  const isOwner = enquiry.postedBy && enquiry.postedBy.toString() === req.user._id.toString();
  const isStoreOrAdmin = ["company_admin", "employee", "platform_admin"].includes(req.user.role);
  if (!isOwner && !isStoreOrAdmin) {
    const err = new Error("You do not have permission to view this enquiry");
    err.status = 403;
    throw err;
  }

  res.json({ enquiry });
});
