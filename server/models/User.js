import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    personID:{
      type: String,
      required: true,
      min: 5,
      max: 15,
    },
    roleID:{
      type: String,
      required: true,
      min: 5,
      max: 15,
    },
    dataSpaceID:{
      type: String,
      required: true,
      min: 5,
      max: 15,
    },
      firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    BSNNumber: {
      type: String,
      required: true,
      min: 9,
      max: 9,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    role: {
      type: [String],  // Changed to an array of strings
      required: true,
      enum: [
        "admin",
        "architect",
        "BIM manager",
        "building manager",
        "building owner",
        "CEO",
        "civil engineer",
        "client",
        "company owner",
        "contract officer",
        "contractor",
        "cost estimator",
        "design manager",
        "digital twin specialist",
        "director",
        "electrical engineer",
        "element owner",
        "employee",
        "energy consultant",
        "engineering manager",
        "facility manager",
        "finance manager",
        "geotechnical engineer",
        "health and safety officer",
        "HR manager",
        "HVAC specialist",
        "installation engineer",
        "IT support",
        "legal advisor",
        "logistics manager",
        "MEP engineer",
        "project director",
        "project leader",
        "procurement manager",
        "quality manager",
        "site manager",
        "structural engineer",
        "sustainability consultant",
        "team leader",
        "urban designer",
        "urban planner",
        "visitor"
      ],
    },
    phoneNumber:{
      type: String,
      required: true,
      min: 5,
      max: 15,
    },
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;