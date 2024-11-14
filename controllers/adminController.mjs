import { AdminModel } from "../models/adminModel.mjs";

export class AdminController{
    static async getHeadersAdmin(req, res){
        if(!req.admin || !req.admin._id){
            return res.status(401).json({message: 'No autenticado'});
        }
        const {_id} = req.admin;
        try {
            const admin = await AdminModel.getHeadersAdmin({_id});
            res.status(200).json(admin);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    static async getAdmin(req, res){
        if (!req.admin || !req.admin._id) {  
            return res.status(401).json({ message: 'No autenticado' });
        }
        const {_id} = req.admin;
        try {
            const admin = await AdminModel.getAdmin({_id});
            res.status(200).json(admin);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }
}