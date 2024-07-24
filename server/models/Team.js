import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema(
  {
    teamID:{
        type: String,
        required: true,
        min: 5,
        max: 15,
    },
    teamName: {
        type: String,
        required: true,
    },
    teamDataSpaceID:{
        type: String,
        required: true,
        min: 5,
        max: 15,
      },
    companies:{
        type: Array,
    },
    clients:{
        type: Array,
    },
    projects: {
        type: Array,
    },
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", TeamSchema);
export default Team;