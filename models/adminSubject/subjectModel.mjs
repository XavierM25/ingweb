import subjectSchema from "../../schemas/subjects/subjectSchema.mjs";

export class SubjectModel{
    static async createSubject({title, image, banner, description, author, rate, level, hours, price, tags}){
        const newSubject = new subjectSchema({title, image, banner, description, author, rate, level, hours, price, tags});
        await newSubject.save();
        return newSubject;
    }

    static async updateSubject({id, title, image, banner, description, author, rate, level, hours, price, tags}){
        const subject = await subjectSchema.findById(id);
        if (!subject) { throw new Error('La materia no existe'); }
        subject.title = title;
        subject.image = image;
        subject.banner = banner;
        subject.description = description;
        subject.author = author;
        subject.rate = rate;
        subject.level = level;
        subject.hours = hours;
        subject.price = price;
        subject.tags = tags;
        await subject.save();
        return subject;
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
    
    static async disableSubject({id}){
        const subject = await subjectSchema.findById(id);
        subject.is_active = false;
        await subject.save();
        return subject;
    }

    static async enableSubject({id}){
        const subject = await subjectSchema.findById(id);
        subject.is_active = true;
        await subject.save();
        return subject;
    }
}