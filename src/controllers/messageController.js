import StatusCodes from 'http-status-codes';

import { cloudinary } from '../config/cloudinaryConfig.js';
import { CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET ,CLOUDINARY_CLOUD_NAME} from '../config/serverconfig.js';
import {getMessageServices} from '../services/messageServices.js';
import {
  customErrorResponse,
  internalErrorResponse,
  successResponse} from '../utils/common/responseObjects.js';
export const getMessageController = async (req, res) => {
    try {
        const response = await getMessageServices(
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
export const getCloudinaryPresignedUrlController = async (req, res) => {
    try {
        const timestamp = Math.floor(new Date().getTime() / 1000);
        const folder = 'user_uploads';
        const signature = cloudinary.utils.api_sign_request(
            {
                timestamp: timestamp,
                folder,
            },
            CLOUDINARY_API_SECRET
        );
        const uploadData = {
            signature,
            timestamp,
            cloudName: CLOUDINARY_CLOUD_NAME,
            apiKey: CLOUDINARY_API_KEY,
            folder
        };
        return res.status(StatusCodes.OK).json(successResponse(uploadData, 'Cloudinary presigned URL fetched successfully'));
    }
    catch (error) {
        console.log('error occurred in getCloudinaryPresignedUrlController', error);
        if (error.status) {
            return res.status(error.status).json(customErrorResponse(error));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
}