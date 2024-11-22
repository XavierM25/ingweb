import { SectionController } from "../../controllers/adminSubject/sectionController.mjs";
import { Router } from "express";
import { adminAuthMiddleware } from "../../middlewares/adminAuthMiddleware.mjs";

const adminSectionRouter = Router();

adminSectionRouter.use(adminAuthMiddleware);
adminSectionRouter.post('/create', SectionController.createSection);
adminSectionRouter.put('/update/:id', SectionController.updateSection);
adminSectionRouter.get('/get/:id', SectionController.getSectionById);

export default adminSectionRouter;  
