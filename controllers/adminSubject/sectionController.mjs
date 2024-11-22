import { SectionModel } from "../../models/adminSubject/sectionModel.mjs";

export class SectionController{
    static async createSection(req,res){
        try {
            if (!req.body) {
                return res.status(400).json({message: 'Falta el cuerpo de la solicitud'});
            }
            const {subject_id, title} = req.body;
            await SectionModel.createSection({subject_id, title});
            res.status(201).json({message: 'Sección creada'});
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

    static async updateSection(req,res){
        try {
            if (!req.body) {
                return res.status(400).json({message: 'Falta el cuerpo de la solicitud'});
            }
            const {id} = req.params;
            const {title} = req.body;
            await SectionModel.updateSection({id, title});
            res.status(201).json({message: 'Sección actualizada'});
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

    static async getSectionById(req,res){
        try {
            const {id} = req.params;
            const section = await SectionModel.getSectionById({id});
            res.status(200).json(section);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

   
}