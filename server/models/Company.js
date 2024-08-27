import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
  {
    companyID:{
      type: String,
      required: true,
      min: 5,
      max: 15,
    },
    companyDataSpaceID:{
      type: String,
      required: true,
      min: 5,
      max: 15,
    },
    companyName: {
      type: String,
      required: true,
    },
    picturePath: {
      type: String,
      default: "",
    },
    employees: {
      type: Array,
    },
    companyOwner: {
      type: Array,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", CompanySchema);
export default Company;