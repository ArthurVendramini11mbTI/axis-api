import { Router } from 'express';
import { createUser, deleteUser, listUsers, updateUserPassword, userLogin } from '../../services/user';
import { User } from '../../types/userTypes';
import { Auth } from '../../middlewares/auth';
import jwt from 'jsonwebtoken';

export const userRouter = Router();

userRouter.post('/createUser', async (req, res) => {
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

userRouter.post('/userLogin', async (req, res) => {
    const UserData: User = req.body

    if(!UserData?.email || !UserData?.password){
        return res.status(400).json({message : 'sem informações'})
    }

    const login = await userLogin(UserData)

    if(login){
        const token = jwt.sign(
            { email: UserData.email },
            process.env.JWT_SECRET as string
        )

        return res.json({message : 'Login realizado com sucesso'})
    }
})

userRouter.get('/listUsers', Auth.private, async (req, res) => {
        const users = await listUsers()
        if(users.length !== 0){
            return res.json({ users })
        }
            return res.json({ error: 'Lista de usuários vazia'})
    
})

userRouter.delete('/deleteUser', Auth.private, async (req, res) => {
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

userRouter.patch('/updateUserPassword', async (req, res) => {
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
