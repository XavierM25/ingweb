import e from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import { PORT, ALLOWED_ORIGINS } from "./config/config.js";
import { database } from "./config/database.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";

const app = e();
database.connect();

app.use(e.json());
app.use(cors({origin: ALLOWED_ORIGINS, credentials: true}));
app.use(cookieParser());
app.use(authMiddleware);
app.disable('x-powered-by');



app.use('/api/user', userRouter);

app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en: http://localhost:${PORT}`);
});