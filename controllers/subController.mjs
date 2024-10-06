import { SubModel } from "../models/subModel.mjs";

export class SubController{

    static async createSubscription(req,res){
        if (!req.user || !req.user._id) {  
            return res.status(401).json({ message: 'No autenticado' });
        }
        const {_id} = req.user;
        const {type, price, max_beneficiaries} = req.body;
        try {
            const subscription = await SubModel.createSubscription({_id, type, price, max_beneficiaries});
            res.status(200).send(subscription);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    static async subscribeUser(req,res){
        if (!req.user || !req.user._id) {  
            return res.status(401).json({ message: 'No autenticado' });
        }
        const {_id} = req.user;
        const {type} = req.body;
        try {
            const subscribe = await SubModel.subscribe({_id, type});
            res.status(200).send(subscribe);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    static async getSubscription(req,res){
        if (!req.user || !req.user._id) {  
            return res.status(401).json({ message: 'No autenticado' });
        }
        const {_id} = req.user;
        try {
            const subscription = await SubModel.getSubscription({_id});
            res.status(200).json(subscription);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}