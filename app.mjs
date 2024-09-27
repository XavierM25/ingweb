import e from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.mjs";
import subRouter from "./routes/subRoutes.mjs";
import authRouter from "./routes/authRoutes.mjs";
import { PORT, ALLOWED_ORIGINS } from "./config/config.mjs";
import { database } from "./config/database.mjs";
import { authMiddleware } from "./middlewares/authMiddleware.mjs";

const app = e();
database.connect();

app.use(e.json());
app.use(cors({origin: ALLOWED_ORIGINS, credentials: true}));
app.use(cookieParser());
app.use(authMiddleware);
app.disable('x-powered-by');

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/sub', subRouter);

app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en: http://localhost:${PORT}`);
});