import { NextFunction, Request, Response } from "express"
import CustomErrorHandler from "../util/CustomErrorHandler";
import { isHttpError } from "http-errors";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorMiddleware =(error: unknown, req: Request, res: Response, next: NextFunction) => {
    let errorMessage = "Something happend in error";
    let statucode =500;
    if (error instanceof CustomErrorHandler) {
        statucode=error.status;
        errorMessage=error.message;
    }
    if(isHttpError(error)){
        statucode=error.status;
        errorMessage=error.message
    }
    return res.status(statucode).json({ message: errorMessage })
}

export default errorMiddleware;