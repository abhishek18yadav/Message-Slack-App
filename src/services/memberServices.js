import { StatusCodes } from "http-status-codes";

import userRepository from "../repositiorires/userRepository.js";
import workspaceRepository from "../repositiorires/workspaceRepository.js"
import ClientError from "../utils/errors/clientError.js";
import { IsUserMemberOfWorkspace } from "./workspaceServices.js";



export const isMemberPartOfWorkspaceServices = async (workspaceId, memberId) => {
    
    const workspace = await workspaceRepository.getById(workspaceId);
    if (!workspace) {
        throw new ClientError({
            explanation: 'Workspace not found',
            message: 'Workspace not found',
            statusCode: StatusCodes.NOT_FOUND
        });
    }
    const isUserMember = IsUserMemberOfWorkspace(workspace, memberId);
    if (!isUserMember) {
        throw new ClientError({
            explaination: 'user is not a member of workspace',
            message: 'user is not a member of workspace',
            statusCode: StatusCodes.UNAUTHORIZED
        })
    }
    const user = userRepository.getById(memberId);
    return user;
    
    
};