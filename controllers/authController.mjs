import { AuthModel } from "../models/authModel.mjs";
import { SECRET_KEY } from "../config/config.mjs";
import jwt from "jsonwebtoken";

export class AuthController{
    static async registerUser(req,res){
        if (!req.body) {
            return res.status(400).json({message: 'Falta el cuerpo de la solicitud'});
        }
        const {username, first_name, last_name, email, password} = req.body;
        try {
            const userCreated = await AuthModel.register({username,first_name,last_name,email,password});
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
            const user = await AuthModel.login({email, password});
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
}