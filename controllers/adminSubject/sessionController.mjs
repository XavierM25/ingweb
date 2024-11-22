import { SessionModel } from "../../models/adminSubject/sessionModel.mjs";

export class SessionController{
    static async createSession(req,res){
        try {
            if (!req.body) {
                return res.status(400).json({message: 'Falta el cuerpo de la solicitud'});
            }
            const {section_id, title, description, video} = req.body;
            await SessionModel.createSession({section_id, title, description, video});
            res.status(201).json({message: 'Sesión creada'});
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

    static async updateSession(req,res){
        try {
            if (!req.body) {
                return res.status(400).json({message: 'Falta el cuerpo de la solicitud'});
            }
            const {id} = req.params;
            const {title, description, video} = req.body;
            await SessionModel.updateSession({id, title, description, video});
            res.status(201).json({message: 'Sesión actualizada'});
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

    static async getSession(req,res){
        try {
            const {id} = req.params;
            const session = await SessionModel.getSession({id});
            res.status(200).json(session);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

    static async getSessions(req,res){
        try {
            const {section_id} = req.params;
            const sessions = await SessionModel.getSessions({section_id});
            res.status(200).json(sessions);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

    static async deleteSession(req,res){
        try {
            const {id} = req.params;
            await SessionModel.deleteSession({id});
            res.status(200).json({message: 'Sesión eliminada'});
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }
    
}