import moongose from "mongoose";

const SectionSchema = moongose.Schema({
    subject_id:{
        type: moongose.SchemaTypes.ObjectId,
        ref: 'Subject',
        required: true
    },
    title:{
        type: String,
        required: true
    }
});

export default moongose.model('Section', SectionSchema);