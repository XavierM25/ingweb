import e from "express";
import { UserController } from "../controllers/userController.mjs";

const userRouter = e.Router()

userRouter.get('/get-headers', UserController.getHeadersUser);
userRouter.get('/get-info', UserController.getUser);
userRouter.patch('/update', UserController.updateUser);

export default userRouter;