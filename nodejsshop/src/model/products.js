import mongoose,{ObjectId} from "mongoose";
import category from './category'
const ProductsSchema = mongoose.Schema({
        name : {
            type: String,
            required: true,
            minLength: 5,
            maxLength: 30
        },
        img : {
            type: String,
            required: true,
        },
        price : {
            type: Number,
            required: true,
        },
        quantity : {
            type: Number,
            required: true,
        },
        desc : {
            type: String,
            required: true,
        },
        category: {
            type: ObjectId,
            ref: category
        }
        
},{timestamps: true})

export default mongoose.model('Product', ProductsSchema)