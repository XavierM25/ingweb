import e from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.mjs";
import subRouter from "./routes/subRoutes.mjs";
import authRouter from "./routes/authRoutes.mjs";
import adminAuthRouter from "./routes/adminAuthRoutes.mjs";
import { PORT, ALLOWED_ORIGINS } from "./config/config.mjs";
import { database } from "./config/database.mjs";

const app = e();
database.connect();

app.use(cors({origin: ALLOWED_ORIGINS, credentials: true}));
app.use(e.json());
app.use(cookieParser());
app.disable('x-powered-by');

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/sub', subRouter);
app.use('/api/admin-auth', adminAuthRouter);

app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en: http://localhost:${PORT}`);
});