import moongose from "mongoose";

const SubjectSchema = moongose.Schema({
    title:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true,
    },
    banner:{
        type: String,
        required: false
    },
    description:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    rate:{
        type: Number,
        required: true
    },
    level:{
        type: String,
        required: true
    },
    hours:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    tags:{
        type: [String],
        required: false
    }
});

export default moongose.model('Subject', SubjectSchema);