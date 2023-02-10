import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    isUpdated: {
      type: Boolean,
    }
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('User', userSchema)