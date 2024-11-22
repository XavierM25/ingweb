import sessionSchema from "../../schemas/subjects/sessionSchema.mjs"; 
import sectionSchema from "../../schemas/subjects/sectionSchema.mjs";

export class SessionModel{
    static async createSession({section_id, title, description, video}){
        const section = await sectionSchema.findById(section_id);
        if (!section) { throw new Error('La sección no existe'); }
        const newSession = new sessionSchema({section_id, title, description, video});
        await newSession.save();
        return newSession;
    }

    static async updateSession({id, title, description, video}){
        const session = await sessionSchema.findById(id);
        if (!session) { throw new Error('La sesión no existe'); }
        session.title = title;
        session.description = description;
        session.video = video;
        await session.save();
        return session;
    }

    static async getSession({id}){
        const session = await sessionSchema.findById(id);
        if (!session) { throw new Error('La sesión no existe'); }
        return session;
    }

    static async getSessions({section_id}){
        const sessions = await sessionSchema.find({section_id});
        return sessions;
    }

    static async deleteSession({id}){
        const session = await sessionSchema.findById(id);
        if (!session) { throw new Error('La sesión no existe'); }
        await session.delete();
        return session;
    }
}