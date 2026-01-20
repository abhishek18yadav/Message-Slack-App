// code include retriving messaeges or information in paginated manner
import { StatusCodes } from 'http-status-codes';

import channelRepository from '../repositiorires/channelRepository.js'
import messageRepository from '../repositiorires/messageRepository.js'
import { IsUserMemberOfWorkspace } from '../services/workspaceServices.js';
import ClientError from '../utils/errors/clientError.js';
export const getMessageServices = async (messageParams, page, limit,user) => {
    try {
        const channelDetails = await channelRepository.getChannelWithWorkspaceDetails(
            messageParams.channelId
        );
        const workspace = channelDetails.workspaceId;
        const isMember = IsUserMemberOfWorkspace(workspace, user);
         if (!isMember) {
            throw new ClientError({
              explanation: 'User is not a member of the workspace',
              message: 'User is not a member of the workspace',
              statusCode: StatusCodes.UNAUTHORIZED
            });
        }
        const messages = await messageRepository(messageParams, page, limit);
        return messages;
    } catch (error) {
        console.log('error in service layer of fetching repository', error);
        throw error;
    }
};
export const createMessageServices = async (message) => {
    const newMessage = await messageRepository.create(message);
    return newMessage;
}