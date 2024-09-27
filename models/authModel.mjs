import userSchema from "../schemas/userSchema.mjs";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../config/config.mjs";

export class AuthModel{
    static async register({username, first_name, last_name, email, password}){
        const existingUser = await userSchema.findOne({$or: [{username}, {email}]});
        if (existingUser) {throw new Error('El usuario o el correo están en uso')};
        if (password < 9) {throw new Error('La contraseña debe ser mayor a 8 dígitos')};

        const hashedPassword = await bcrypt.hash(password, parseInt(SALT_ROUNDS));
        const newUser = new userSchema({username, password: hashedPassword, first_name, last_name, email});
        await newUser.save();
        return newUser;
    }
    
    static async login({email, password}){
        const existingUser = await userSchema.findOne({email});
        if(!existingUser){throw new Error('El usuario no existe')};

        const isValid = await bcrypt.compare(password, existingUser.password);
        if(!isValid){throw new Error('contraseña incorrecta')};

        return existingUser;
    }

    
}