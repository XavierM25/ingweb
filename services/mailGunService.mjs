import FormData from 'form-data';
import Mailgun from "mailgun.js";
import { MAILGUN_API_KEY, PORT } from '../config/config.mjs';


const mailgun = new Mailgun(FormData);

const mg = mailgun.client({
    username: 'api',
    key: MAILGUN_API_KEY,
    proxy:{
        protocol: 'http',
        host: '127.0.0.1',
        port: PORT
    }
});

export { mg };