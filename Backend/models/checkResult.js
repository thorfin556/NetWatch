import mongoose from "mongoose";


const resultSchema = new mongoose.Schema({
    monitor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Monitor',
        required: true,
        index: true
    },
    status:{
        type: String,
        required: true,
        enum: ['UP', 'DOWN']
    },
    responseTime:{
        type: Number,
        required: true
    },
    statusCode: {
        type: Number
    },
    checkedAt:{
        type: Date,
        default: Date.now,
        index: true,
        expires: 604800
    }
});

resultSchema.index({monitor:1, checkedAt: -1});

const resultModel =
  mongoose.models.Result || mongoose.model("CheckResult", resultSchema);
export default resultModel;