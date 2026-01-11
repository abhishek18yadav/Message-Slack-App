import dotenv from "dotenv";

dotenv.config();

export const MONGO_URL = process.env.MONGO_URL;
export const JWT_EXPIRY = process.env.JWT_EXPIRY;
export const JWT_SECRET = process.env.JWT_SECRET;
export const MAIL_ID = process.env.MAIL_ID;
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD;