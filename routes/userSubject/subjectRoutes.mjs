import { SubjectController } from "../../controllers/userSubject/subjectController.mjs";
import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware.mjs";

const userSubjectRouter = Router();
userSubjectRouter.use(authMiddleware);

userSubjectRouter.get("/get-all", SubjectController.getSubjects);
userSubjectRouter.get("/get/:id", SubjectController.getSubjectById);

export default userSubjectRouter;