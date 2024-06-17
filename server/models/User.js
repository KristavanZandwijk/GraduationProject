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
      type: String,
      required: true,
      enum: ["visitor", "client", "employee", "building owner", "element owner", "building manager"],
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