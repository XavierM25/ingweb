import adminSchema from "../schemas/adminSchema.mjs";

export class AdminModel{
    static async getHeadersAdmin({_id}){
        const admin = await adminSchema.findById(_id);
        if(!admin){throw new Error('El administrador no existe')};
        return {
            _id: admin._id,
            username: admin.username,
            first_name: admin.first_name,
            last_name: admin.last_name,
            profile_picture: admin.profile_picture,
            role: admin.role
        };
    }

    static async getAdmin({_id}){
        const admin = await adminSchema.findById(_id);
        if(!admin){throw new Error('El administrador no existe')};
        return {
            _id: admin._id,
            username: admin.username,
            first_name: admin.first_name,
            last_name: admin.last_name,
            birthdate: admin.birthdate,
            role: admin.role,
            email: admin.email,
            profile_picture: admin.profile_picture,
            creation_date: admin.creation_date
        };
    }
}