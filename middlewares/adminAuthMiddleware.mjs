import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/config.mjs";

export function adminAuthMiddleware(req, res, next) {
  const token = req.cookies.access_token;
  req.admin = null;

  if (!token) {
    return res.status(401).json({ message: "admin no autenticado" });
  }

  try {
    const data = jwt.verify(token, SECRET_KEY);
    req.admin = { _id: data.id };
    next(); 
  } catch (error) {
    console.error('Error en la verificación del token: ', error);
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
}
