import { AuthModel } from "../models/authModel.mjs";
import { SECRET_KEY, MAILGUN_DOMAIN } from "../config/config.mjs";
import jwt from "jsonwebtoken";
import { mg } from "../services/mailGunService.mjs";

export class AuthController{
    static sendVerificationEmail = (email, verificationUrl) => {
        mg.messages.create(
            `${MAILGUN_DOMAIN}`, {
            from: `Excited User <mailgun@sandboxcc252e11dde74c798594cc79faf16c6f.mailgun.org>`,
            to: [email],
            subject: "Verifica tu correo electrónico",
            text: "Testing some Mailgun awesomeness!",
            html: ` <h1>Verifica tu correo</h1>
                    <p>Haz clic en el siguiente enlace para verificar tu cuenta:</p>
                    <a href="${verificationUrl}">Verificar correo</a>`
        })
        .then(msg => console.log(msg))
        .catch(err => console.log(err));
    };

    static async registerUser(req,res){
        if (!req.body) {
            return res.status(400).json({message: 'Falta el cuerpo de la solicitud'});
        }
        const {username, first_name, age, last_name, email, password} = req.body;
        try {
            const user = await AuthModel.register({username,first_name,last_name, age, email,password});
            const verificationToken = jwt.sign({id: user._id}, SECRET_KEY, {expiresIn: '1d'});
            const verificationUrl = `http://localhost:3000/api/auth/verify-email?token=${verificationToken}`;
            AuthController.sendVerificationEmail(email, verificationUrl);
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

    static async verifyEmail(req,res){
        const token = req.query.token;
        if (!token) {
            return res.status(400).json({message: 'Falta el token'});
        }
        try {
            const {id} = jwt.verify(token, SECRET_KEY);
            await AuthModel.verifyEmail({_id: id});
            res.json({message: 'Correo verificado'});
        } catch (error) {
            res.status(400).json({message: error.message});
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
            return res.status(200).json(false);
        }
        try {
            await jwt.verify(token, SECRET_KEY);
            res.json(true);
        } catch {
            res.status(200).json(false);
        }
    }
}