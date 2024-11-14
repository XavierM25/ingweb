import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    role:{
        type: String,
        required: true,
        enum: ['admin', 'superadmin'],
        default: 'admin'
    },
    profile_picture:{
        type: String,
        default: 'https://i.imgur.com/RiGVJfC.png'
    },
    password: {
        type: String,
        required: true
    },
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    creation_date:{
        type: Date,
        default: Date.now,
        required: true
    }
});


export default mongoose.model('Admin', adminSchema);