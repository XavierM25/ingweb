 import subscriptionSchema from "../schemas/subscriptionSchema.mjs";


export async function subPrecenseMiddleware(req, res, next) {
    try {
        if (!req.user || !req.user._id) {  
            return res.status(401).json({ message: 'No autenticado' });
        }
        const { _id } = req.user;
        const user = await subscriptionSchema.exists({ _id });
        if (!user) {
            return res.status(403).json({ message: 'No estás suscrito' });
        }

        req.user.subscription = user;

        next();
    } catch (error) {
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
}
