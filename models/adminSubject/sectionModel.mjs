import sectionSchema from "../../schemas/subjects/sectionSchema.mjs";

export class SectionModel{

    static async createSection({subject_id, title}){
        const newSection = new sectionSchema({subject_id, title});
        await newSection.save();
        return newSection;
    }

    static async updateSection({id, title}){
        const section = await sectionSchema.findById(id);
        if (!section) { throw new Error('La sección no existe'); }
        section.title = title;
        await section.save();
        return section;
    }

    static async getSectionById({id}){
        const section = await sectionSchema.find({ subject_id: id }); 
        if (!section) { throw new Error('La sección no existe'); }
        return section;
    }

}