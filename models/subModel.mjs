import userSchema from "../schemas/userSchema.mjs";
import subscriptionSchema from "../schemas/subscriptionSchema.mjs";

export class SubModel{
    static async subscribe({_id, type}){
        const existingUser = await userSchema.findById({_id});
        if(!existingUser){throw new Error('El usuario no existe')};

        const start_date = new Date();
        const end_date = this.calcDate({start_date, type}); 
        const newSubscription = new subscriptionSchema({type, userID: _id, start_date, end_date});
        await newSubscription.save();

        await userSchema.findByIdAndUpdate({_id}, {
            $push: { subscription: newSubscription._id }
          });
        return newSubscription;
    }

    static calcDate({start_date, type}){
        let end_date = new Date(start_date);
        switch (type) {
            case 'monthly':
                end_date.setMonth(end_date.getMonth() + 1);
                break;
            case 'biannual':
                end_date.setMonth(end_date.getMonth() + 6);
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