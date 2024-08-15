import { type Request, type Response } from "express";
import * as AuthControllers from './auth.controller'

const mainRouteController = async (req: Request, res: Response) => {
    return res.send(`Server is up!`)
}

export {
    mainRouteController,
    AuthControllers
}