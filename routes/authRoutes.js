import e from "express";
import { AuthController } from "../controllers/authController.js";

const authRouter = e.Router();

authRouter.post('/register', AuthController.registerUser);
authRouter.post('/login', AuthController.loginUser);

export default authRouter;