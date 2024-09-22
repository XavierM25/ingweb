import mongoose from "mongoose";
import { DB_MONGO } from "./config.js";

export class database{
    static async connect(){
        try {
            await mongoose.connect(DB_MONGO);
            console.log('Base de datos conectada!');
        } catch (error) {
            console.error(error);
        }
    }
}