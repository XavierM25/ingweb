import { Router } from "express";
import { adminAuthMiddleware } from "../../middlewares/adminAuthMiddleware.mjs";
import { UploadController } from "../../controllers/adminSubject/uploadController.mjs";

const uploadSubjectRouter = Router();
uploadSubjectRouter.use(adminAuthMiddleware);

uploadSubjectRouter.post('/uploadVideo', UploadController.uploadVideo);



export default uploadSubjectRouter;
