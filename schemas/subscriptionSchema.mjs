import mongoose from "mongoose";

const SubscriptionSchema = mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    max_beneficiaries:{
        type: Number,
        required: true
    },
});

export default mongoose.model('Subscription', SubscriptionSchema);