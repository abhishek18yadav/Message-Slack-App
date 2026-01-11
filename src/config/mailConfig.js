
import nodemailer from 'nodemailer';

import { MAIL_ID, MAIL_PASSWORD } from './serverconfig.js';
const transport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: MAIL_ID,
        pass: MAIL_PASSWORD
    }
});
export default transport;