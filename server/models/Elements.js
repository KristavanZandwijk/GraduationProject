import mongoose from "mongoose"; 

const ElementSchema = new mongoose.Schema(
    {
        elementID:{
            type: String,
            required: true,
            min: 5,
            max: 15,
        },
        elementDataSpaceID:{
            type: String,
            required: true,
            min: 5,
            max: 15,
        },
        hasBuilding:{
            type: String,
            required: true,
        },
         hasFiles:{
            type: Array,
            default: [],
        },
         isPartOf:{
            type: Array,
            default: [],
        },
        hasOwner: {
            type: String,
            required: true,
        },
        elementName: {
            type: String,
            required: true,
        },
        elementLocation:{
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Element = mongoose.model("Element", ElementSchema);
export default Element;