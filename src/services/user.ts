import { email } from "zod";
import { Prisma } from "../../generated/prisma/browser";
import { prisma } from "../lib/prisma"
import { User } from "../types/userTypes";
import bcrypt from "bcrypt";

export const createUser = async (data: Prisma.UserCreateInput) =>{
        const hashedPassword = await bcrypt.hash(data.password, 10);

        return await prisma.user.create({ 
            data: {
                email: data.email,
                password: hashedPassword
            }
         })
}

export const listUsers = async () => {
        return await prisma.user.findMany({})
}

export const deleteUser = async(id: number) => {
        await prisma.user.delete({
            where: {
            id: id
        }
    })
}

export const updateUserPassword = async(id: number, password: string) => {
    await prisma.user.update({
        where: {id: id},
        data: {
            password: password
        }
    })
}

export const userLogin = async (data : User) => {
    
     const user = await prisma.user.findUnique({ 
        where: {
            email: data.email
        }
     })
     if(!user){
        return false
     }

     const passwordMatch = await bcrypt.compare(
        data.password,
        user.password 
    );

    if (!passwordMatch) {
        return false;
    }

    return true;
}
