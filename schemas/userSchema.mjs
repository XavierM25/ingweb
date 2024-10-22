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
    birthdate:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['teacher', 'student', 'admin'],
        default: 'student',
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    profile_picture:{
        type: String,
        default: 'https://i.imgur.com/RiGVJfC.png'
    },
    subscription:{
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'UserSubscription',
        default: []
    },
    scholarship:{
        type: Boolean,
        default: false
    },
    creation_date:{
        type: Date,
        default: Date.now,
        required: true
    }
});

export default mongoose.model('User', UserSchema);