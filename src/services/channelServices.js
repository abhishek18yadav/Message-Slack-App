import { StatusCodes } from "http-status-codes";

import channelRepository from "../repositiorires/channelRepository.js"
import messageRepository from "../repositiorires/messageRepository.js"
import ClientError from "../utils/errors/clientError.js";
import { IsUserMemberOfWorkspace } from "./workspaceServices.js";
export const getChannelByIdServices = async (channelId, userId) => {
    try {
        const channel = await channelRepository.getChannelWithWorkspaceDetails(channelId);
        if (!channel || !channel.workspaceId) {
            throw new ClientError({
                message: 'channel not found with provided data',
                explaination: 'channel not found with provided data',
                statusCode: StatusCodes.NOT_FOUND
            })
        }
        const isUserPartOfWorkspace = IsUserMemberOfWorkspace(
            channel.workspaceId, userId
        );
        if (!isUserPartOfWorkspace) {
            throw new ClientError({
                message: 'user is not a part of workspace',
                explaination: 'user is not part of workspace',
                statusCode: StatusCodes.UNAUTHORIZED
            });
        }
        const messages = await messageRepository.getPaginatedMessages({ channelId }, 1, 20);
        return {
            messages,
            _id: channel._id,
            name: channel.name,
            createedAt: channel.createdAt,
            updatedAt: channel.updatedAt,
            workspaceId: channel.workspaceId
        };
    } catch (error) {
        console.log('error in get channel by id services', error);
        throw error;
    }
};