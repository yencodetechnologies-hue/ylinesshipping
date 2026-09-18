import Company from "../models/Company.js";

const PREFIX = "YLN";

/** Generates a unique "YLN-0042" style code, matching the placeholder shown on the Register page. */
export async function generateCompanyCode() {
  for (let attempt = 0; attempt < 20; attempt++) {
    const candidate = `${PREFIX}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
    const exists = await Company.exists({ code: candidate });
    if (!exists) return candidate;
  }
  throw new Error("Could not generate a unique company code, please retry");
}
