import { AuthModel } from "../models/authModel.mjs";
import { SECRET_KEY } from "../config/config.mjs";
import jwt from "jsonwebtoken";

export class AuthController{
    static async registerUser(req,res){
        if (!req.body) {
            return res.status(400).json({message: 'Falta el cuerpo de la solicitud'});
        }
        const {username, first_name, last_name, birthdate, email, password} = req.body;
        try {
            await AuthModel.register({username,first_name,last_name,birthdate,email,password});
            res.json({message: 'Usuario registrado'});
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
            res.status(200)
            .cookie('access_token', token, {
                    httpOnly: true,
                    sameSite: 'lax',
                    maxAge: 1000 * 60 * 60
                })
                .json({message: 'Usuario autenticado'});
        } catch (error) {
            res.status(401).json({message: error.message});
        }
    }

    static async logout(req,res){
        try {
            res.clearCookie('access_token',{
                httpOnly: true,
                sameSite: 'lax'
            })
            .status(200)
            .json({message: 'Sesión cerrada'});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    static async verifyToken(req,res){
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(401).json(false);
        }
        try {
            await jwt.verify(token, SECRET_KEY);
            res.json(true);
        } catch (error) {
            res.status(401).json({message: error.message});
        }
    }
}