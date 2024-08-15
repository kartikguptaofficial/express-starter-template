import express, { type Request, type Response } from 'express'
import * as ServerControllers from '../controllers/index.controller'
import catchAsync from '../utils/global/error.util';

const app = express()

app.get('/', catchAsync(ServerControllers.AuthControllers.authController))

export default app;