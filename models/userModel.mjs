import userSchema from "../schemas/userSchema.mjs";
export class UserModel{
    static async getUser({_id}){
        const user = await userSchema.findById({_id});
        if(!user){throw new Error('El usuario no existe')};
        return {
            _id: user._id,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role,
            email: user.email,
            profile_picture: user.profile_picture,
            subscription: user.subscription,
            creation_date: user.creation_date
        };
    }

    static async setUsername({_id, username}){
        const user = await userSchema.findById({_id});
        if(!user){throw new Error('El usuario no existe')};
        user.username = username;
        return {username};
    }
}