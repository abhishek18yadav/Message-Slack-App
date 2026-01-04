import { StatusCodes } from "http-status-codes";
import { createworkspaceServices,deleteWorkspaceService,getWorkspaceUserIsMemberOfService , getWorkspaceService} from "../services/workspaceServices.js"
import { customErrorResponse, internalErrorResponse, successResponse } from "../utils/common/responseObjects.js";


export const createworkspaceController = async (req, res) => {
    try {
        const response = createworkspaceServices({
            ...req.body,
            owner: req.user
        });
        return res.status(StatusCodes.CREATED).json(
            successResponse(response, 'workspace created successfully')
        );
    } catch (error) {
        console.log(error);
        if(error.statusCode){
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
        
    }
}
export const getWorkspaceUserIsMemberOfController = async (req, res) => {
    try {
        const response = getWorkspaceUserIsMemberOfService(req.user);
        return res.status(StatusCodes.OK).json(
            successResponse(response, 'workspace fetched successfully')
        );
    } catch (error) {
        console.log(error);
        if (error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        };
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
};

export const deleteWorkspaceController = async (req, res) => {
    try {
        const response = await deleteWorkspaceService(req.params.workspaceId, req.user);
        return res.status(StatusCodes.OK).json(successResponse(response, 'workspace deleted uccessfully'));

    } catch (error) {
        console.log(error);
        if (error.statusCode) {
            res.status(error.statusCode).json(customErrorResponse(error));
        }
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
}
export const getWorkspaceController = async (req, res) => {
    try {
        const response = getWorkspaceService(
            req.params.workspaceId,
            req.user
        );
        return res.status(StatusCodes.OK).json(successResponse(response, 'Workspace deleted successfully'));
    }
    catch (error) {
        console.log('get workspace controller error', error);
        if (error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
};