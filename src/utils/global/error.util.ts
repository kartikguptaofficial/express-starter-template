import { type NextFunction, type Request, type Response } from "express";
// import * as Sentry from "@sentry/node";

const catchAsync = (fn: any, optionalPayload: any = null) => (req: Request, res: Response, next: NextFunction) => {

    if (optionalPayload?.body) {
        const schema = optionalPayload.body;
        const isValidSchema = schema.safeParse(req.body);
        if (!isValidSchema.success) {
            // 422 - Unprocessable Entity
            return res.status(422).json({
                success: false,
                data: isValidSchema.error,
                message: 'Some Unknown Error'
            })
        }
    }

    Promise.resolve(fn(req, res, next)).catch((err) => {
        let errName = err.name
        console.error({ errName })
        let errMessage = err.message;
        if (!errMessage) errMessage = err;
        console.error('CaughtError:', err);
        console.error('ErrorStack:', err.stack)
        console.error('ErrorPayload:', JSON.stringify(req.body));
        console.error('ErrorParams:', req.params);
        console.error('--------------------xxxxxx--------------------');
        console.error(err.stack)
        let responseStatusCode = 500;
        if (err.statusCode) responseStatusCode = err.statusCode

        // Sentry.captureException(err);

        try {
            errMessage = JSON.parse(errMessage)
            errMessage = errMessage.map((ex: any) => ex.message).join(",")
        } catch (e) { }

        return res.status(responseStatusCode).json({
            success: false,
            message: errMessage,
        });
    });
};

export default catchAsync