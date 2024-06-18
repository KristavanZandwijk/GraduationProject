import mongoose from "mongoose";

const FileSchema = mongoose.Schema(
    {
        userId:{
            type: String, 
            required: true, 
        },
        personID:{
            type: String,
            required: true,
        },
        dataSpaceID:{
            type: String,
            required: true,
        },
        description: String,
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
    },
    { timestamps: true }
);

const File = mongoose.model("File", FileSchema);

export default File;