import { SubController } from "../controllers/subController.mjs";
import e from "express";

const subRouter = e.Router();

subRouter.post('/subscribe', SubController.subscribeUser);

export default subRouter;