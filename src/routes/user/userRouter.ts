import { Router } from 'express';
import { createUser, deleteUser, userLogin, listUsers, updateUserPassword } from '../../services/user';
import { User } from '../../types/userTypes';
import { createAccessToken, validateAcessToken } from '../../services/tokens';

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
    
    const validation = await userLogin(UserData)
    
    if(validation == true){
        const token = createAccessToken(UserData.email)

        return res.json({message : 'Login realizado com sucesso', token: token})
    }
        return res.status(401).json({message : 'ACESSO NEGADO'})
})

userRouter.get('/validation', (req, res) => {
    const authHeader = req.headers.authorization
    const [scheme, token] = authHeader?.split(' ') ?? []

    if(scheme !== 'Bearer' || !token){
        return res.status(401).json({error: 'Não autorizado'})
    }

    const validation = validateAcessToken(token)

    if(!validation){
        return res.status(401).json({error: 'Não autorizado'})
    }

    return res.json({message: 'Acesso autorizado'})
})

userRouter.get('/listUsers', async (req, res) => {
        const users = await listUsers()
        if(users.length !== 0){
            return res.json({ users })
        }
            return res.json({ error: 'Lista de usuários vazia'})
    
})

userRouter.delete('/deleteUser', async (req, res) => {
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
