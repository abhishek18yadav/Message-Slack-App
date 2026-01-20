import express from 'express';

import { getMessageController } from '../../controllers/messageController.js';
import {isAuthenticated} from '../../utils/common/authUtils.js'

const router = express.Router();
router.get('/messages/:channelId', isAuthenticated, getMessageController);
export default router;