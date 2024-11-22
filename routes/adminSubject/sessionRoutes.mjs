import { SessionController } from "../../controllers/adminSubject/sessionController.mjs";
import { Router } from "express";
import { adminAuthMiddleware } from "../../middlewares/adminAuthMiddleware.mjs";

const adminSessionRouter = Router();

adminSessionRouter.post('/create', adminAuthMiddleware, SessionController.createSession);
adminSessionRouter.put('/update/:id', adminAuthMiddleware, SessionController.updateSession);
adminSessionRouter.get('/get-session/:id', adminAuthMiddleware, SessionController.getSession);
adminSessionRouter.get('/get-sessions/:id', adminAuthMiddleware, SessionController.getSessions);
adminSessionRouter.delete('/delete/:id', adminAuthMiddleware, SessionController.deleteSession);


export default adminSessionRouter;
