import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    order_data : {
        type : Array,
        required : true
    }
})


// Export the model
export default mongoose.models.orders || mongoose.model('orders', OrderSchema);