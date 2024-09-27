import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/config.mjs";

export function authMiddleware(req,res,next) {
    const token = req.cookies.access_token;
    req.user = null;
    if (token) {
        try {
            const data = jwt.verify(token,SECRET_KEY);
            req.user = {_id: data.id}
        } catch (error) {
            console.error('Error en la verificacion del token ' + error);
        }
    }
    next();
}