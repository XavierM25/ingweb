import adminSchema from "../schemas/adminSchema.mjs";
import { SALT_ROUNDS } from "../config/config.mjs";
import bcrypt from "bcrypt";

export class AdminAuthModel{
    static async register({username, first_name, last_name, password, email}){
        const existingAdmin = await adminSchema.findOne({$or: [{username}, {email}]});
        if (existingAdmin) {throw new Error('El usuario o el correo están en uso')};
        if (password < 9) {throw new Error('La contraseña debe ser mayor a 8 dígitos')};

        const hashedPassword = await bcrypt.hash(password, parseInt(SALT_ROUNDS));
        const newAdmin = new adminSchema({username, password: hashedPassword, email, first_name, last_name});
        await newAdmin.save();
        return newAdmin;
    }

    static async login({email, password}){
        const existingAdmin = await adminSchema.findOne({email});
        if(!existingAdmin){throw new Error('El usuario no existe')};

        const isValid = await bcrypt.compare(password, existingAdmin.password);
        if(!isValid){throw new Error('contraseña incorrecta')};
        return existingAdmin;
    }


}