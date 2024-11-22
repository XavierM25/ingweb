import { PORT, ALLOWED_ORIGINS } from "./config/config.mjs";
import { database } from "./config/database.mjs";
import e from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.mjs";
import subRouter from "./routes/subRoutes.mjs";
import authRouter from "./routes/authRoutes.mjs";
import adminAuthRouter from "./routes/adminAuthRoutes.mjs";
import adminInfoRouter from "./routes/adminRoutes.mjs";
import adminSubjectRouter from "./routes/adminSubject/subjectRoutes.mjs";
import uploadSubjectRouter from "./routes/adminSubject/uploadRoutes.mjs";
import adminSectionRouter from "./routes/adminSubject/sectionRoutes.mjs";
import adminSessionRouter from "./routes/adminSubject/sessionRoutes.mjs";
import userSubjectRouter from "./routes/userSubject/subjectRoutes.mjs";

const app = e();

database.connect();

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || ALLOWED_ORIGINS.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('No permitido por CORS'));
        }
      }, 
    credentials: true})
);

app.use(e.json());
app.use(cookieParser());
app.disable('x-powered-by');

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/sub', subRouter);
app.use('/api/user-subject', userSubjectRouter);

app.use('/api/admin-auth', adminAuthRouter);
app.use('/api/admin', adminInfoRouter);
app.use('/api/admin-subject', adminSubjectRouter);
app.use('/api/admin-subject', uploadSubjectRouter);
app.use('/api/admin-section', adminSectionRouter);
app.use('/api/admin-session', adminSessionRouter);

app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en: http://localhost:${PORT}`);
});