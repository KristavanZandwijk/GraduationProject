import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    projectID:{
        type: String,
        required: true,
        min: 5,
        max: 15,
    },
    projectName: {
        type: String,
        required: true,
    },
    projectDescription:{
        type: String,
    },
    companies:{
        type: Array,
    },
    employees: {
        type: Array,
    },
    clients:{
        type: Array,
    },
    files:{
        type: Array,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", ProjectSchema);
export default Project;