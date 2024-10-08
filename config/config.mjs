/* eslint-disable no-undef */
import { configDotenv } from "dotenv";

configDotenv({path: "variables.env"});

const PORT = process.env.PORT;
const DB_MONGO = process.env.DB_MONGO;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS.split(',');
const SALT_ROUNDS = process.env.SALT_ROUNDS;
const SECRET_KEY = process.env.SECRET_KEY;
const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
const SECRET_KEY_MAILGUN = process.env.SECRET_KEY_MAILGUN;

export { PORT, DB_MONGO, ALLOWED_ORIGINS, SALT_ROUNDS, SECRET_KEY, MAILGUN_API_KEY, MAILGUN_DOMAIN, SECRET_KEY_MAILGUN };