import express from 'express';

import { getCloudinaryPresignedUrlController, getMessageController } from '../../controllers/messageController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';

const router = express.Router();
router.get('/messages/:channelId', isAuthenticated, getMessageController);
router.get('/cloudinary-presigned-url', isAuthenticated, getCloudinaryPresignedUrlController);
export default router;