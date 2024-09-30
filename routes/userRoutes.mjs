import e from "express";
import { UserController } from "../controllers/userController.mjs";

const userRouter = e.Router();

userRouter.get('/get-info', UserController.getUser);
userRouter.post('/set-username', UserController.setUsername)

export default userRouter;