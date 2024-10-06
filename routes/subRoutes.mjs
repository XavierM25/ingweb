import { SubController } from "../controllers/subController.mjs";
import e from "express";

const subRouter = e.Router();

subRouter.post('/subscribe', SubController.subscribeUser);
subRouter.post('/create', SubController.createSubscription);
subRouter.get('/get', SubController.getSubscription);
subRouter.post('/add', SubController.addBeneficiary);

export default subRouter;