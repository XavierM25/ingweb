import SubjectModel from "../../models/userSubject/subjectModel.mjs";

export class SubjectController{
    static async getSubjects(req, res){
        try {
            const subjects = await SubjectModel.getSubjects();
            res.status(200).json(subjects);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}