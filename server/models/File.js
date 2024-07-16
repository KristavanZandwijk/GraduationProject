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
        hasOwner:{
            type: String,
            required: true,
        },
        considers: {
            type: String,
            enum: ["element", "building", "project"], // Allowed values 
        },
        personalDataSpaceID:{
            type:String,
        },
        elementDataSpaceID:{
            type: String,
        },
        buildingDataSpaceID:{
            type: String,
        },
        companyDataSpaceID:{
            type: String,
        },     
        relatedToProject:{
            type: String,
        },
    },
    { timestamps: true }
);


const File = mongoose.model("File", FileSchema);

export default File;