import mongoose from "mongoose";

const UserSubscriptionSchema = mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:'User',
        required: true
    },
    subscription_id:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Subscription',
        required: true
    },
    beneficiary_user_id:[{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        default: [],
    }],
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

export default mongoose.model('UserSubscription', UserSubscriptionSchema);