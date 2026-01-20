import StatusCodes from 'http-status-codes';

import {getMessageServices} from '../services/messageServices.js';
import successResponse, { customErrorResponse, internalErrorResponse } from '../utils/common/responseObjects.js';
export const getMessageController = async (req, res) => {
    try {
        const response = getMessageServices(
            {
                channelId: req.params.channelId
            },
            req.query.page || 1,
            req.query.limit || 20,
            req.user
        );
        return res.status(StatusCodes.OK).json(successResponse(response, 'Messages fetched successfully'));

    } catch (error) {
        console.log('error occurred in messageController', error);
        if (error.status) {
            return res.status(error.status).json(customErrorResponse(error));

        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
}