import mongoose, { Types } from "mongoose";


const modelSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
  isActive:{
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const monitorModel =
   mongoose.models.Monitor ||
   mongoose.model("Monitor", modelSchema);
export default monitorModel;
