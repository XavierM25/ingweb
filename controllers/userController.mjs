import { UserModel } from "../models/userModel.mjs";
export class UserController{
    static async getUser(req, res){
        if (!req.user || !req.user._id) {  
            return res.status(401).json({ message: 'No autenticado' });
        }
        const {_id} = req.user;
        try {
            const user = await UserModel.getUser({_id});
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    static async updateUser(req, res){
        if (!req.user || !req.user._id) {  
            return res.status(401).json({ message: 'No autenticado' });
        }
        const {_id} = req.user;
        const data = req.body;
        try {
            const updatedUser = await UserModel.updateUser({_id, data});
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }
}
