import subjectSchema from "../../schemas/subjects/subjectSchema.mjs";

export class SubjectModel{
    static async createSubject({title, image, banner, description, author, rate, level, hours, price, tags}){
        const newSubject = new subjectSchema({title, image, banner, description, author, rate, level, hours, price, tags});
        await newSubject.save();
        return newSubject;
    }

    static async getSubjectID({id}) {
        const subject = await subjectSchema.findById(id);
        return subject;
    }

    static async getSubjectTitle({title}){
        const subject = await subjectSchema.find({
            title: { $regex: title, $options: 'i' }  
        });
        return subject;
    }

    static async getSubjects(){
        const subjects = await subjectSchema.find();
        return subjects;
    }

}