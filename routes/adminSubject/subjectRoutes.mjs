import { SubjectController } from "../../controllers/adminSubject/subjectController.mjs";
import { adminAuthMiddleware } from "../../middlewares/adminAuthMiddleware.mjs";
import { Router } from "express";

const adminSubjectRouter = Router();

adminSubjectRouter.use(adminAuthMiddleware);
adminSubjectRouter.post('/create', SubjectController.createSubject);
adminSubjectRouter.get('/get-id/:id', SubjectController.getSubjectID);
adminSubjectRouter.get('/get-title/:title', SubjectController.getSubjectTitle);
adminSubjectRouter.get('/get-all', SubjectController.getSubjects);


export default adminSubjectRouter;
