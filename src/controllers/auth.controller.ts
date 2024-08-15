import { type Request, type Response } from "express";

const authController = async (req: Request, res: Response) => {
    return res.send(`Auth APIs are up!`)
}

export {
    authController
}