import { SessionController } from "../../controllers/userSubject/sessionController.mjs";
import { authMiddleware } from "../../middlewares/authMiddleware.mjs";
import Router from "express";

const userSessionRouter = Router();

userSessionRouter.get('/get-all-sections-and-sessions/:id', authMiddleware, SessionController.getAllSectionsAndSessionsBySubjectId);


export default userSessionRouter;