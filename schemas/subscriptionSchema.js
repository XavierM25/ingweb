import mongoose from "mongoose";

const SubscriptionSchema = mongoose.Schema({
    userID: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:'User',
        required: true
    },
    type:{
        type: String,
        enum: ['monthly', 'bimonthly', 'quarterly', 'annual'],
        required: true
    },
    start_date:{
        type: Date,
        required: true
    },
    end_date:{
        type: Date,
        required: true
    },
    status:{
        type: String,
        enum: ['active', 'canceled', 'expired'],
        default: 'active'
    }
});

export default mongoose.model('Subscription', SubscriptionSchema);