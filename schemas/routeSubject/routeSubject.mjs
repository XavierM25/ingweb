import moongose from "mongoose";

const RouteSubjectSchema = moongose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    subjects: {
        type: [moongose.SchemaTypes.ObjectId],
        ref: 'Subject',
        required: true
    }
});

export default moongose.model('RouteSubject', RouteSubjectSchema);