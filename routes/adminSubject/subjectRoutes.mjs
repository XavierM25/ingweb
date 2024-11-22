import { SubjectController } from "../../controllers/adminSubject/subjectController.mjs";
import { adminAuthMiddleware } from "../../middlewares/adminAuthMiddleware.mjs";
import { Router } from "express";

const adminSubjectRouter = Router();

adminSubjectRouter.use(adminAuthMiddleware);
adminSubjectRouter.post('/create', SubjectController.createSubject);
adminSubjectRouter.put('/update/:id', SubjectController.updateSubject);
adminSubjectRouter.get('/get-id/:id', SubjectController.getSubjectID);
adminSubjectRouter.get('/get-title/:title', SubjectController.getSubjectTitle);
adminSubjectRouter.get('/get-all', SubjectController.getSubjects);
adminSubjectRouter.put('/disable/:id', SubjectController.disableSubject);
adminSubjectRouter.put('/enable/:id', SubjectController.enableSubject);

export default adminSubjectRouter;
