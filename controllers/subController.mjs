import { SubModel } from "../models/subModel.mjs";

export class SubController{
    static async subscribeUser(req,res){
        if (!req.user || !req.user._id) {  
            return res.status(401).json({ message: 'No autenticado' });
        }
        const {_id} = req.user;
        const {type} = req.body;
        try {
            const subscribe = await SubModel.subscribe({_id, type});
            res.send(subscribe);
        } catch (error) {
            res.status(500).json({message: error.message});
        }

    }
}