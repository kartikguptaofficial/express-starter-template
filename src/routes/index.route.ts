import express, { type Request, type Response } from 'express'
import * as ServerControllers from '../controllers/index.controller'
import catchAsync from '../utils/global/error.util';
import AuthRoutes from './auth.route'

const app = express()

app.get('/', catchAsync(ServerControllers.mainRouteController))

app.use('/auth', AuthRoutes);

export default app;