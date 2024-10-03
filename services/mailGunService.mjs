import FormData from 'form-data';
import Mailgun from "mailgun.js";
import { MAILGUN_API_KEY } from '../config/config.mjs';


const mailgun = new Mailgun(FormData);

const mg = mailgun.client({
    username: 'api',
    key: MAILGUN_API_KEY
});

export {mg};