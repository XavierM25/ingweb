import userSchema from "../schemas/userSchema.mjs";
import subscriptionSchema from "../schemas/subscriptionSchema.mjs";
import userSubscriptionSchema from "../schemas/userSubscriptionSchema.mjs";

export class SubModel {

    static async createSubscription({ _id, type, price, max_beneficiaries }) {
        const existingUser = await userSchema.findById({ _id });
        if (!existingUser) { throw new Error('El usuario no existe') };
        if (existingUser.role !== 'admin') { throw new Error('No tienes permisos para realizar esta acción') }

        const existingSubscription = await subscriptionSchema.findOne({ type });
        if (existingSubscription) { throw new Error('Tipo de subscripción ya existe') };

        const newSubscription = new subscriptionSchema({ type, price, max_beneficiaries });
        await newSubscription.save();
        return newSubscription;
    }


    static async subscribe({ _id, type }) {
        const existingUser = await userSchema.findById({ _id });
        if (!existingUser) { throw new Error('El usuario no existe') };

        const subscriptionType = await subscriptionSchema.findOne({ type });
        if (!subscriptionType) { throw new Error('Tipo de subscripción no válido') };

        const start_date = new Date();
        const end_date = new Date(start_date);
        end_date.setFullYear(end_date.getFullYear() + 1);

        const newSubscription = new userSubscriptionSchema({
            user_id: _id,
            subscription_id: subscriptionType._id,
            start_date,
            end_date,
            status: 'active'
        });
        await newSubscription.save();

        await userSchema.findByIdAndUpdate({ _id }, {
            $push: { subscription: newSubscription._id }
        });

        return newSubscription;
    }

    static async getSubscription({ _id }) {
        const user = await userSchema.findById({ _id });
        if (!user) { throw new Error('El usuario no existe') };

        const subscription = await userSubscriptionSchema.findById({ _id: user.subscription });
        if (!subscription) { throw new Error('El usuario no tiene subscripción') };

        const subscriptionType = await subscriptionSchema.findById({ _id: subscription.subscription_id });
        return {
            subscription_id: subscription.subscription_id,
            type: subscriptionType.type,
            start_date: subscription.start_date,
            end_date: subscription.end_date,
            status: subscription.status,
            price: subscriptionType.price,
            max_beneficiaries: subscriptionType.max_beneficiaries
        };
    }

}