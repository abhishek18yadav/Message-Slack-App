import { StatusCodes } from "http-status-codes";

import {customErrorResponse} from '../utils/common/responseObjects.js'
export const validate = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync(req.body);
            next();
        }
        catch (error) {
            let explaination = [];
            let errorMessage = '';
            error.errors.forEach((key) => {
                explaination.push(key.path[0] + ' ' + key.message);
                errorMessage += ':' + key.path[0] + ' ' + key.message;
            });
            return res.status(StatusCodes.BAD_REQUEST).json(
                customErrorResponse({
                    message: 'Validation Error' + errorMessage,
                    explaination: explaination
                })
            );
        }
    }
};