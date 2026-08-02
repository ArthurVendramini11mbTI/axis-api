import { Router } from 'express';
import { createGoal, deleteGoal, listGoals, editGoal } from '../../services/goal';

export const goalsRouter = Router();

goalsRouter.post('/createGoal', async (req, res) => {

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

goalsRouter.get('/listGoals', async (req, res) => {
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

goalsRouter.delete('/deleteGoal', async (req, res) => {
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


goalsRouter.patch('/editGoal', async (req, res) => {

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