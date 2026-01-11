import { StatusCodes } from "http-status-codes";

import { getChannelByIdServices } from "../services/channelServices.js"
import { customErrorResponse, successResponse } from "../utils/common/responseObjects.js";


export const getChannelByIdController = async (req, res) => {
    try {
        const response = await getChannelByIdServices(req.params.channelId, req.user);
        return res.status(StatusCodes.OK).json(successResponse(response, 'channel fetched successfully'));

    } catch (error) {
        console.log('error in get channel by id controller', error);
        if (error.status) {
            return res.status(error.status).json(customErrorResponse(error));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(customErrorResponse(error));
    }
}