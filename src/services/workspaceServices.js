import { StatusCodes } from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';

import { addEmailtoMailQueue } from '../producer/mailQueueProducer.js';
import channelRepository from '../repositiorires/channelRepository.js';
import userRepository from '../repositiorires/userRepository.js';
import workspaceRepository from '../repositiorires/workspaceRepository.js';
import { workspaceJoinMail } from '../utils/common/mailObject.js';
import ClientError from '../utils/errors/clientError.js';
import ValidationError from '../utils/errors/validationErrors.js';

const isUserAdminOfWorkspace = (workspace, userId) => {
    const response = workspace.members.find(
        (member) => (member.memberId.toString() === userId ||
            member.memberId._id.toString() === userId) && member.role === 'admin'
    );
    return response;
};

export const IsUserMemberOfWorkspace = (workspace, userId) => {
    return workspace.member.find(
        (member) => member.memberId.toString() === userId
    );
}
const isChannelAlreadyPartOfWorkspace = (workspace, channelName) => {
    return workspace.channels.find(
        (channel) => channel.name.toLowerCase() === channelName.toLowerCase()
    );
};
export const createworkspaceServices = async (workspaceData) => {
    try {
        const joinCode = uuidv4().substring(0, 6).toUpperCase();
        const response = await workspaceRepository.create({
            name: workspaceData.name,
            description: workspaceData.description,
            joinCode:joinCode
        });
        await workspaceRepository.addMemberToWorkspace(
            response._id,
            workspaceData.owner,
            'admin'
        );
        const updatedWorkspace = await workspaceRepository.addChannelToWorkspace(
            response._id,
            'general'
        );

        return updatedWorkspace;
    } catch (error) {
        console.log('create workspaceService error', error);
        if (error.name === 'ValidationError') {
            throw new ValidationError({
                error: error.errors,
            }, error.message);
        }
        if (error.name === 'MongoServerError' && error.code === 11000) {
            throw new ValidationError(
                { error: ['Duplication error'] },
                'A workspace with same details alredy exist'
            );
        }
        throw error;
    }
}
export const getWorkspaceUserIsMemberOfService = async (userId) => {
    try {
        const response = await workspaceRepository.fetchAllWorkspaceByMemberId(userId);
        return response;
    } catch (error) {
        console.log('Get workspace user is member of service error', error);
        throw error;
    }
};
export const deleteWorkspaceService = async (workspaceId, userId) => {
    try {
        const workspace = await workspaceRepository.getById(workspaceId);
        if (!workspace) {
            throw new ClientError({
                message: 'workspace not found',
                explaination: 'invalid data from client',
                statuscode: StatusCodes.NOT_FOUND
            });
        }
        console.log(workspace.members, userId);
        const IsAllowed = isUserAdminOfWorkspace(workspace, userId);
        if (IsAllowed) {
            await channelRepository.deleteMany(workspace.channels);
            const response = await workspaceRepository.delete(workspaceId);
            return response;
        }
        throw new ClientError({
            explaination: 'user is either not a member or not admin',
            message: 'User is not allowed',
            statuscode: StatusCodes.UNAUTHORIZED
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const getWorkspaceService = async (workspaceId, userId)=>{
    try {
        const workspace = await workspaceRepository.getById(workspaceId);
        if (!workspace) {
            throw new ClientError({
                explaination: 'Invalid data sent from client',
                message: 'workspace not found',
                statuscode: StatusCodes.NOT_FOUND
            });
        }
        const isMember = IsUserMemberOfWorkspace(workspace, userId);
        if (isMember) {
            throw new ClientError({
                explaination: 'user is already member of workspace',
                message: 'user is already member of workspace',
                statuscode: StatusCodes.UNAUTHORIZED
            });
        }
        return workspace;
    }
    catch (error) {
        console.log('error found in getWorkspaceServices', error);
        throw error;
    }

};
export const getWorkspaceByJoinCodeService = async (joinCode, userId) => {
    try {
        const workspace = await workspaceRepository.getWorkspaceByJoinCode(joinCode);
        if (!workspace) {
            throw new ClientError({
                explaination: 'Invalid data sent from the user',
                message: 'workspace not found',
                statuscode: StatusCodes.NOT_FOUND
            });
        }
        const isMember = IsUserMemberOfWorkspace(workspace, userId);
        if (!isMember) {
            throw new ClientError({
                explaination: 'sender is not a member of workspace',
                message: 'joinCode sender is not a member',
                statuscode: StatusCodes.UNAUTHORIZED
            });
        }
        return workspace;
    } catch (error) {
        console.log("error in get workspace by join code services", error);
        throw error;
    }
};
export const updateWorkspaceServices = async (workspaceId, workspaceData, userId) => {
    try {
        const workspace = await workspaceRepository.getById(workspaceId);
        if (!workspace) {
            throw new ClientError({
                explaination: 'Invalid data sent from the user',
                message: 'Workspace not found ',
                statuscode: StatusCodes.NOT_FOUND
            });
        }
        const isAdmin = isUserAdminOfWorkspace(workspace, userId);
        if (!isAdmin) {
            throw new ClientError({
                explaination: 'User is not an admin of workspace',
                message: 'User is not Admin of workspace',
                statuscode: StatusCodes.UNAUTHORIZED
            });
        }
        const updatedWorkspace = await workspaceRepository.update(workspaceId, workspaceData);
        return updatedWorkspace;
    } catch (error) {
        console.log("update workspace service error", error);
        throw error;
    }
};
export const addMemberToWorkspaceService = async (workspaceId, memberId, role,userId) => {
    try {
        const workspace = await workspaceRepository.getById(workspaceId);
        if (!workspace) {
            throw new ClientError({
                explaination: 'invalid data sent from user',
                message: 'workspace not found',
                statuscode: StatusCodes.NOT_FOUND
            });
        }
        const isAdmin = isUserAdminOfWorkspace(workspace, userId);
        if (!isAdmin) {
            throw new ClientError({
                explanation: 'User is not an admin of the workspace',
                message: 'User is not an admin of the workspace',
                statusCode: StatusCodes.UNAUTHORIZED
            });
        }
        const isValidUser = await userRepository.getById(memberId);
        if (!isValidUser) {
            throw new ClientError({
                explaination: 'invalid data send from the user',
                message: 'User not found',
                statuscode: StatusCodes.NOT_FOUND
            });
        }
        const isMember = IsUserMemberOfWorkspace(memberId);
        if (!isMember) {
            throw new ClientError({
                explaination: 'User Not a member of workspace',
                message: 'User not Member',
                statuscode: StatusCodes.UNAUTHORIZED
            });
        }
        const response = await workspaceRepository.addMemberToWorkspace(workspaceId, memberId, role);
        addEmailtoMailQueue({
            ...workspaceJoinMail(workspace),
            to:isValidUser.email

        })
        return response;
    } catch (error) {
        console.log('error occur in addMember service ', error);
        throw error;
    }
}
export const addChannelToWorkspaceService = async (workspaceId, channelName, userId)=>{
    try {
        const workspace = await workspaceRepository.getWorkspaceDetailsById(workspaceId);
        if (!workspace) {
            throw new ClientError({
                explanation: 'Invalid data sent from the client',
                message: 'Workspace not found',
                statusCode: StatusCodes.NOT_FOUND
            });
        }
        
        const isAdmin = isUserAdminOfWorkspace(workspace, userId);
        if (!isAdmin) {
            throw new ClientError({
                explanation: 'User is not an admin of the workspace',
                message: 'User is not an admin of the workspace',
                statusCode: StatusCodes.UNAUTHORIZED
            });
        }
        const isChannelPartOfWorkspace = isChannelAlreadyPartOfWorkspace(
            workspace,
            channelName
        );
        if (isChannelPartOfWorkspace) {
            throw new ClientError({
                explanation: 'Invalid data sent from the client',
                message: 'Channel already part of workspace',
                statusCode: StatusCodes.FORBIDDEN
            });
        }
        const response = await workspaceRepository.addChannelToWorkspace(
            workspaceId,
            channelName
        );

        return response;
    } catch (error) {
        console.log('addChannelToWorkspaceService error', error);
        throw error;
    }
};