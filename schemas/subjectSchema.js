import moongose from "mongoose";

const SubjectSchema = moongose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: false
    },
    authorID:{
        type: moongose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    hours:{
        type: Number,
        required: false
    }
});

export default moongose.model('Subject', SubjectSchema);