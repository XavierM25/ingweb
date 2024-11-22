import { SessionModel } from "../../models/userSubject/sessionModel.mjs";

export class SessionController{
    static async getAllSectionsAndSessionsBySubjectId(req, res){
        try {
            if(!req.params.id){throw new Error('No se proporciono el id de la materia');}
            if(!req.body){throw new Error('No se proporciono el cuerpo de la solicitud');}
            const sectionsAndSessions = await SessionModel.getAllSectionsAndSessionsBySubjectId(req.params.id);
            res.status(200).json(sectionsAndSessions);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }
}