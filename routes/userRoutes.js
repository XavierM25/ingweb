import e from "express";
import { UserController } from "../controllers/userController.js";

const userRouter = e.Router();

userRouter.post('/register', UserController.registerUser);
userRouter.post('/login', UserController.loginUser);
userRouter.post('/subscribe', UserController.subscribeUser);
export default userRouter;