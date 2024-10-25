import userSchema from "../schemas/userSchema.mjs";
export class UserModel{
    static async getHeadersUser({_id}) {
        const user = await userSchema.findById({_id});
        if (!user) { throw new Error('El usuario no existe'); }
        return {
            _id: user._id,
            username: user.username,
            profile_picture: user.profile_picture,
            first_name: user.first_name,
            role: user.role            
        }
    }

    static async getUser({_id}){
        const user = await userSchema.findById({_id});
        if(!user){throw new Error('El usuario no existe')};
        return {
            _id: user._id,
            username: user.username,
            first_name: user.first_name,
            birthdate: user.birthdate,
            last_name: user.last_name,
            role: user.role,
            email: user.email,
            profile_picture: user.profile_picture,
            subscription: user.subscription,
            creation_date: user.creation_date
        };
    }

    static async updateUser({_id, data}){
        const user = await userSchema.find({_id});
        if(!user){throw new Error('El usuario no existe')};
        if (data.email && await userSchema.findOne({ email: data.email, _id: { $ne: _id } })) {
            throw new Error('El correo electrónico ya está en uso');
        }
        const updatedUser = await userSchema.findByIdAndUpdate(
            _id,
            {$set: data},
            {new: true, runValidators: true}
        );
        return {
            _id: updatedUser._id,
            username: updatedUser.username,
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name,
            birthdate: updatedUser.birthdate,
            role: updatedUser.role,
            email: updatedUser.email,
            profile_picture: updatedUser.profile_picture,
            subscription: updatedUser.subscription,
            creation_date: updatedUser.creation_date
        };
    }
}