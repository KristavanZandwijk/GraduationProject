import mongoose from "mongoose";

const FileSchema = mongoose.Schema(
    {
        fileID:{
            type: String, 
            required: true,
        },
        fileName:{
            type: String,
            required: true,
        },
        filePath:{
            type: String,
            required: true,
        },
        fileDescription:{
            type: String,
            required: true,
        },
        fileOwner:{
            type: String,
            required: true,
        },
        considers: {
            type: String,
            enum: ["element", "building"],
        },
        personalDataSpaceID:{
            type:String,
        },
        elementDataSpaceID:{
            type: Array,
        },
        buildingDataSpaceID:{
            type: Array,
        },
        companyDataSpaceID:{
            type: String,
        },
        relatedToTeam:{
            type: String,
        },    
        relatedToProject:{
            type: String,
        },
        status: {
            type: String,
            enum: ["private", "sharedCompany", "sharedTeam", "public"], // Allowed values 
        },
    },
    { timestamps: true }
);


const File = mongoose.model("File", FileSchema);

export default File;