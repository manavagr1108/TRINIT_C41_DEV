import mongoose from "mongoose";

const dataSchema = mongoose.Schema(
  {
    url:String,
    dataSent:Number,
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('DataSchema', dataSchema)