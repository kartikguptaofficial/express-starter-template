import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import ServerRoutes from './routes/index.route';

const app = express();

const corsOptions = {
    origin: ['http://localhost:3000', 'http://example.com'],  // List of allowed origins.
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

const jsonOptions = {
    limit: '100mb',
    parser: express.json(),
};

const urlencodedOptions = {
    limit: '80mb',
    extended: false,
    parser: express.urlencoded(),
};

// Enables CORS for the application.
app.use(cors(corsOptions));

// Enables JSON parsing for the application.
app.use(express.json(jsonOptions));

// Enables URL - encoded parsing for the application.
app.use(express.urlencoded(urlencodedOptions));

/**
 * Mounts server routes.
 * @example /v1
 */
app.use('/v1', ServerRoutes);

/**
 * Global error handler.
 *
 * @param {Error} err - Error object.
 * @param {Request} req - Request object.
 * @param {Response} res - Response object.
 * @param {NextFunction} next - Next function.
 */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).send({ message: 'An unexpected error occurred', error: err.message });
});

export default app;