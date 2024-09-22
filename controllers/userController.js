import { SECRET_KEY } from "../config/config.js";
import { UserModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";

export class UserController{
    static async registerUser(req,res){
        if (!req.body) {
            return res.status(400).json({message: 'Falta el cuerpo de la solicitud'});
        }
        const {username, first_name, last_name, email, password} = req.body;
        try {
            const userCreated = await UserModel.register({username,first_name,last_name,email,password});
            res.send(userCreated);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    static async loginUser(req,res){
        if (!req.body) {
            return res.status(400).json({message: 'Falta el cuerpo de la solicitud'});
        }
        const {email, password} = req.body;
        try {
            res.clearCookie('access_token');
            const user = await UserModel.login({email, password});
            const token = jwt.sign({id: user._id, username: user.userCreated}, SECRET_KEY,{
                expiresIn: '1h'
            });
            res.cookie('access_token', token, {
                    httpOnly: true,
                    sameSite: 'lax',
                    maxAge: 1000 * 60 * 60
                })
                .send({user});
        } catch (error) {
            res.status(401).json({message: error.message});
        }
    }

    static async subscribeUser(req,res){
        if (!req.user || !req.user._id) {  
            return res.status(401).json({ message: 'No autenticado' });
        }
        const {_id} = req.user;
        const {type} = req.body;
        try {
            const subscribe = await UserModel.subscribe({_id, type});
            res.send(subscribe);
        } catch (error) {
            res.status(500).json({message: error.message});
        }

    }
}
