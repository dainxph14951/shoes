import mongoose from "mongoose";

const newsSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    contentdetail: {
        type: String,
        required: true
    },

},{timestamps: true})
export default mongoose.model('News', newsSchema)