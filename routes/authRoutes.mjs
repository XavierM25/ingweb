import e from "express";
import { AuthController } from "../controllers/authController.mjs";

const authRouter = e.Router();

authRouter.post('/register', AuthController.registerUser);
authRouter.post('/login', AuthController.loginUser);
authRouter.post('/logout', AuthController.logout);
authRouter.get('/verify-email', AuthController.verifyEmail);
authRouter.get('/verify-token', AuthController.verifyToken);

export default authRouter;