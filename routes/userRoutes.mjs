import e from "express";
import { UserController } from "../controllers/userController.mjs";

const userRouter = e.Router();

userRouter.get('/get-info', UserController.getUser);

export default userRouter;