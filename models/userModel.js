import bcrypt from "bcrypt";
import userSchema from "../schemas/userSchema.js";
import subscriptionSchema from "../schemas/subscriptionSchema.js";
import { SALT_ROUNDS } from "../config/config.js";

export class UserModel{
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

    static async subscribe({_id, type}){
        const existingUser = await userSchema.findById({_id});
        if(!existingUser){throw new Error('El usuario no existe')};

        const start_date = new Date();
        const end_date = this.calcDate({start_date, type}); 
        const newSubscription = new subscriptionSchema({type, userID: _id, start_date, end_date});
        await newSubscription.save();

        await userSchema.findByIdAndUpdate({_id}, {
            $push: { suscripciones: newSubscription._id }
          });
        return newSubscription;
    }

    static calcDate({start_date, type}){
        let end_date = new Date(start_date);
        switch (type) {
            case 'monthly':
                end_date.setMonth(end_date.getMonth() + 1);
                break;
            case 'bimonthly':
                end_date.setMonth(end_date.getMonth() + 2);
                break;
            case 'quarterly':
                end_date.setMonth(end_date.getMonth() + 3);
                break;
            case 'annual':
                end_date.setFullYear(end_date.getFullYear() + 1);
                break;
            default:
                throw new Error('Tipo de subscripción no válido');
        }
        return end_date;
    }

}