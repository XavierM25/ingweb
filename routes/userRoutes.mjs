import e from "express";
import { UserController } from "../controllers/userController.mjs";
import { authMiddleware } from "../middlewares/authMiddleware.mjs";

const userRouter = e.Router();
userRouter.use(authMiddleware);

userRouter.get('/get-headers', UserController.getHeadersUser);
userRouter.get('/get-info', UserController.getUser);
userRouter.patch('/update', UserController.updateUser);

export default userRouter;