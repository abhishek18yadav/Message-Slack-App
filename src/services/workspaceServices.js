import { v4 as uuidv4 } from 'uuid';
import workspaceRepository from '../repositiorires/workspaceRepository.js'
import ValidationError from '../utils/errors/validationErrors.js';
import ClientError from '../utils/errors/clientError.js';
import { StatusCodes } from 'http-status-codes';
import channelRepository from '../repositiorires/channelRepository.js';

export const createworkspaceServices = async (workspaceData) => {
    try {
        const joincode = uuidv4().substring(0, 6).toUpperCase();

        const response = await workspaceRepository.create({
            name: workspaceData.name,
            description: workspaceData.description,
            joincode
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
        const IsAllowed = workspace.members.find(
            (member) => member.memberId.toString() === userId && member.role == 'admin'
        );
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