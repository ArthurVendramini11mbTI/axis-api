import { Router } from 'express';
import { createUser, deleteUser, userLogin, listUsers, updateUserPassword } from '../services/user';
import { createGoal, deleteGoal, listGoals, editGoal } from '../services/goal';
import { User } from '../types/userTypes';

export const mainRouter = Router();



mainRouter.post('/createUser', async (req, res) => {
    try {
        const userDataResult: User = req.body

        await createUser(userDataResult)

        return res.status(201).json(userDataResult)
    } catch (error) {
        return res.status(400).json({
            message: "Dados inválidos ou erro ao criar usuário",
            error
        });
    }
});

mainRouter.get('/userLogin', async (req, res) => {
    const UserData: User = req.body

    if(!UserData){
        return res.json({message : 'sem informações'})
    }
    
    const validation = await userLogin(UserData)
    
    if(validation == true){
        return res.json({message : 'Login realizado com sucesso'})
    }
        return res.json({message : 'ACESSO NEGADO'})
})

mainRouter.get('/listUsers', async (req, res) => {
        const users = await listUsers()
        if(users.length !== 0){
            return res.json({ users })
        }
            return res.json({ error: 'Lista de usuários vazia'})
    
})

mainRouter.delete('/deleteUser', async (req, res) => {
    const userId = req.body.userId

        if(isNaN(userId)){
            return res.status(400).json({ error: 'ID inválido' })
        }
    
    try{
        await deleteUser(userId);

        res.json({ message: 'Usuário deletado com sucesso' })

    }catch (error){
        res.status(404).json({ error: 'Usuário não encontrado' })
    }
});

mainRouter.patch('/updateUserPassword', async (req, res) => {
    const userId = req.body.userId
    const newPassword = req.body.newPassword

    if (!newPassword) {
        return res.status(400).json({
            error: 'Nova senha é obrigatória'
        });
    }

    if(isNaN(userId)){
            return res.status(400).json({ error: 'ID inválido' })
        }

    try{ 
        await updateUserPassword(userId, newPassword)
        res.json({ message: 'Senha atualizada com sucesso' });
    }catch (error){
        res.status(404).json({ error: 'Usuário não encontrado' })
    }

})

mainRouter.post('/createGoal', async (req, res) => {

    const { userId, goalName, goalDescription, goalTime  } = req.body

    if(isNaN(userId)){
        return res.status(400).json({
            error: 'ID inválido'
        })
    }

    try{
        await createGoal({
            goalName: goalName,
            goalDescription: goalDescription,
            goalTime: goalTime,
            userId: userId
        })
    return res.json({message: 'Goal criada com sucesso'})
    }catch(error){
        return res.json({ error : 'Goal não foi criada'})
    }
})

mainRouter.get('/listGoals', async (req, res) => {
    const id = req.body

    if(isNaN(id)){
        return res.status(400).json({
            error: 'ID inválido'
        })
    }

    const goals = await listGoals(id)
    if(goals.length !== 0){
        return res.json(goals)
    }
        return res.json({message : 'Nenhuma goal foi encontrada'})
})

mainRouter.delete('/deleteGoal', async (req, res) => {
    const userId = req.body.userId

    if(isNaN(userId)){
        return res.status(400).json({
            error: 'ID inválido'
        })
    }

    const goalId = req.body.goalId

    if(isNaN(goalId)){
            return res.status(400).json({ error: 'ID inválido' });
        }

    try{
        await deleteGoal(userId, goalId)
        return res.json({message : 'Goal deletada com sucesso'})
    }catch(error){
        return res.json({error : 'A goal não foi deletada'})
    }
})


mainRouter.patch('/editGoal', async (req, res) => {

    const {goalId, userId, goalName, goalDescription, goalTime} = req.body

    if(isNaN(userId)){
        return res.status(400).json({
            error: 'ID inválido'
        })
    }

    try{
        const editedGoal = await editGoal(goalId, userId, goalName, goalTime, goalDescription)
        res.json({message: 'Goal editada com sucesso', editedGoal: editedGoal})
    }catch(error){
        res.json({message: 'erro'})
    }
})