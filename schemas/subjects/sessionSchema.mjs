import moongose from "mongoose";

const SessionSchema = moongose.Schema({
    section_id:{
        type: moongose.SchemaTypes.ObjectId,
        ref: 'Section',
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    video:{
        type: String,
        required: true
    }
});

export default moongose.model('Session', SessionSchema);