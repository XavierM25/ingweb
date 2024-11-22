import subjectSchema from "../../schemas/subjects/subjectSchema.mjs";

export default class SubjectModel {
    static async getSubjects(){
        return await subjectSchema.find({ is_active: true });
    }
}