import { StatusCodes } from "http-status-codes";

import { addChannelToWorkspaceService,addMemberToWorkspaceService, createworkspaceServices,deleteWorkspaceService,getWorkspaceByJoinCodeService, getWorkspaceService, getWorkspaceUserIsMemberOfService , updateWorkspaceServices} from "../services/workspaceServices.js"
import { customErrorResponse, internalErrorResponse, successResponse } from "../utils/common/responseObjects.js";


export const createworkspaceController = async (req, res) => {
    try {
        const response = await createworkspaceServices({
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
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
    
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
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
    
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
export const getWorkspaceByJoinCodeController = async (req, res) => {
    try {
        const response = await getWorkspaceByJoinCodeService(req.params.joinCode, req.user);
        return res.status(StatusCodes.OK).json(successResponse(response, "workspace fetched successfully"));

    } catch (error) {
        console.log("error in get workspace by joinCode controlller", error);
        if (error.status) {
            return res.status(error.status).json(customErrorResponse(error));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
};
export const updatedWorkspaceController = async (req, res) => {
    try {
        const response = await updateWorkspaceServices(
            req.params.workspaceId,
            req.body,
            req.user
        );
        return res.status(StatusCodes.OK).json(successResponse(response, "workspace updated successgully"));

    } catch (error) {
        console.log("error in update workspace controller", error);
        if (error.status) {
            res.status(error.status).json(customErrorResponse(error));
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
};
export const addMemberToWorkspaceController = async (req, res) => {
    try {
        const response = await addMemberToWorkspaceService(
            req.params.workspaceId,
            req.body.memberId,
            req.body.role || 'member'
        );
        return res.status(StatusCodes.OK).json(successResponse(response, " member added to workspace successfully"));

    } catch (error) {
        console.log('add member to workspace controller error', error);
        if (error.status) {
            res.status(error.status).json(customErrorResponse(error));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
};
export const addChannelToWorkspaceController = async (req, res) => {
    try {
        const response = await addChannelToWorkspaceService(
            req.params.workspaceId,
            req.params.channelName,
            req.user
        );
        return res.status(StatusCodes.OK).json(successResponse(response, "channel added to workspace successfully"));
    } catch (error) {
        console.log("adding channel to workspace controller error ", error);
        if (error.status) {
            return res.status(error.status).json(customErrorResponse(error));

        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
};