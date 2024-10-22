import userSchema from "../schemas/userSchema.mjs";

export class UserSeeeder{
    static async seed(){
        const users = [
            {
                username: "zentoo31",
                first_name: "Diego Alessandro",
                last_name: "Pineda Calagua",
                age: 19,
                role: "student",
                email: "zentoo31@gmail.com",
                password: "const",

            }
        ];
    }
}