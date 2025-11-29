import mongoose from "mongoose";

import { MONGO_URL } from "./serverconfig.js";

 export default async function connectDb() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("connected to mongoDB");
    } catch (error) {
        console.log("error while database connection : ", error);
    }
}