import { AdminAuthController } from "../controllers/adminAuthController.mjs";
import e from "express";

const adminAuthRouter = e.Router();

adminAuthRouter.post('/register', AdminAuthController.createAdmin);
adminAuthRouter.post('/login', AdminAuthController.loginAdmin);
adminAuthRouter.post('/logout', AdminAuthController.logout);
adminAuthRouter.get('/verify-token', AdminAuthController.verifyToken);


export default adminAuthRouter;
