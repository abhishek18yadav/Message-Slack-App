import { StatusCodes } from 'http-status-codes';

import {isMemberPartOfWorkspaceServices} from '../services/memberServices.js'
import { customErrorResponse, internalErrorResponse, successResponse } from '../utils/common/responseObjects.js';

export const isMemberPartOfWorkspaceController = async (req, res)=> {
    try {
        const response = await isMemberPartOfWorkspaceServices(req.params.workspaceId, req.user);
        return res.status(StatusCodes.OK).json(successResponse(response, 'user is a member of workspace'));
    } catch (error) {
        console.log('error in memberController', error);
        if (error.status) {
            return res.statusCode(error.status).json(customErrorResponse(error));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
}