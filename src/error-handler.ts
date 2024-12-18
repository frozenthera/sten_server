import { NextFunction, Request, Response } from "express";
import HttpException from "./http-exception";

const errorHandler = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(err.status || 500);
    res.json({
        status: err.status || 500,
        message: err.message
    });
};

export default errorHandler;