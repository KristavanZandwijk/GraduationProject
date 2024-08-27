import mongoose from "mongoose"; 

const BuildingSchema = new mongoose.Schema(
    {
        buildingID:{
            type: String,
            required: true,
            min: 5,
            max: 15,
        },
        buildingDataSpaceID:{
            type: String,
            required: true,
            min: 5,
            max: 15,
        },
        archivedBuildingDataSpaceID:{
            type: String,
            required: true,
            min: 5,
            max: 15,
        },
        buildingOwner: {
            type: Array,
        },
        buildingName: {
            type: String,
            required: true,
        },
        buildingLocation:{
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Building = mongoose.model("Building", BuildingSchema);
export default Building;
