import { Prisma } from "../../generated/prisma/browser";
import { prisma } from "../lib/prisma"

export const createGoal = async (data: Prisma.GoalUncheckedCreateInput) => {
    return await prisma.goal.create({data});
}

export const listGoals = async (id: number) => {
        return await prisma.goal.findMany({
            where:{
                userId: id
            }
        })
}

export const deleteGoal = async (userId : number, goalId: number) => {
    return await prisma.goal.delete({
        where: {userId : userId, id: goalId}
    })
}


export const editGoal = async ( id: number, userId: number, goalName: string, goalTime: number, goalDescription?: string) => {
    return await prisma.goal.update({
        where: {id : id, userId: userId},
        data: {
            goalName: goalName,
            goalDescription: goalDescription,
            goalTime: goalTime
        }
    })
}
