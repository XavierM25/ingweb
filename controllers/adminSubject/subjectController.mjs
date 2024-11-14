import { SubjectModel } from "../../models/adminSubject/subjectModel.mjs";


export class SubjectController{
    static async createSubject(req, res){
        try {
            if (!req.body) {
                return res.status(400).json({message: 'Falta el cuerpo de la solicitud'});
            }
            const {title, image, banner, description, author, rate, level, hours, price, tags} = req.body;
            await SubjectModel.createSubject({title, image, banner, description, author, rate, level, hours, price, tags});
            res.status(201).json({message: 'Materia creada'});
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

    static async getSubjectID(req,res){
        try {
            const {id} = req.params;
            const subject = await SubjectModel.getSubjectID({id});
            res.status(200).json(subject);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

    static async getSubjectTitle(req, res){
        try {
            const {title} = req.params;
            const subject = await SubjectModel.getSubjectTitle({title});
            res.status(200).json(subject);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

    static async getSubjects(req, res){
        try {
            const subjects = await SubjectModel.getSubjects();
            res.status(200).json(subjects);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }
}