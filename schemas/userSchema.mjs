import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    role:{
        type: String,
        enum: ['teacher', 'student', 'administrator'],
        default: 'student',
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    password:{
        type: String,
        required: true
    },
    profile_picture:{
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
    },
    subscription:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Subscription',
        default: null
    },
    creation_date:{
        type: Date,
        default: Date.now,
        required: true
    }
});

export default mongoose.model('User', UserSchema);