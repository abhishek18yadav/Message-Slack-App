import StatusCodes from 'http-status-codes';
import { customErrorResponse } from '../utils/common/responseObjects.js';
import userRepository from '../repositiorires/userRepository.js'
import { JWT_SECRET } from '../config/serverconfig.js'
import jwt from 'jsonwebtoken';
export const isAuthenticated = async(req, res, next) => {
    try {
        const token = req.headers('x-access-token');
        if (!token) {
            return res.status(StatusCodes.FORBIDDEN).json(
                customErrorResponse({
                    message: 'invalid auth '
                })
            );
        }
        const response = jwt.verify(token, JWT_SECRET);
        if (!response) {
            return res.status(StatusCodes.FORBIDDEN).json(
                customErrorResponse({
                    explanation: 'Invalid data sent from the client',
                    message: 'Invalid auth token provided'
                })
            );
        }
        const user = await userRepository.getById(response.id);
        req.user = user.id;
        next();
    } catch (error) {
        console.log('Auth middleware error');
        if (error.name === 'JsonWebTokenError') {
            return res.status(StatusCodes.FORBIDDEN).json(
                customErrorResponse({
                    explanation: 'Invalid data sent from the client',
                    message: 'Invalid auth token provided'
                })
            )
        }
         return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
    }
}