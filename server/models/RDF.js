import mongoose from "mongoose";

const RDFSchema = mongoose.Schema(
    {
        ifcFileName: {
          type: String,
          required: true,
        },
        ttlFilePath: {
          type: String,
          required: true,
        },
      },
      { timestamps: true }
    );


const RDF = mongoose.model("RDF", RDFSchema);

export default RDF;