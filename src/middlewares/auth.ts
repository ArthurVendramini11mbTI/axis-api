import { Request, Response, NextFunction } from "express"

export const Auth = {
    private: (req: Request, res: Response, next: NextFunction) => {
        let success = false

        if(success){
            return next()
        }

        return res.status(403).json({ error: "Não autorizado"})
    }
}