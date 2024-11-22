import sessionSchema from "../../schemas/subjects/sessionSchema.mjs";
import sectionSchema from "../../schemas/subjects/sectionSchema.mjs";
export class SessionModel{

    static async getAllSectionsAndSessionsBySubjectId(id){
        const sections = await sectionSchema.find({subject_id: id});
        if(!sections){throw new Error('No se encontraron secciones');}
        const sectionsAndSessions = await Promise.all(sections.map(async (section) => {
            const sessions = await sessionSchema.find({section_id: section._id});
            return {
                _id: section._id,
                title: section.title,
                sessions: sessions.map(session => ({
                    title: session.title,
                    description: session.description,
                    video: session.video
                }))
            };
        }));
        return sectionsAndSessions;
    }


}