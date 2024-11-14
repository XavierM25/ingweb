import { Router } from "express";
import { AdminController } from "../controllers/adminController.mjs";
import { adminAuthMiddleware } from "../middlewares/adminAuthMiddleware.mjs";

const adminInfoRouter = Router();
adminInfoRouter.use(adminAuthMiddleware);

adminInfoRouter.get('/get-headers', AdminController.getHeadersAdmin);
adminInfoRouter.get('/get-info', AdminController.getAdmin);


export default adminInfoRouter;


