import express from 'express'

import channelRouter from './channel.js'
import memberRouter from './member.js';
import userRouter from './user.js'
import workspaceRouter from './workspaceRouter.js'
const router = express.Router();

router.use('/user', userRouter);
router.use('/workspace', workspaceRouter);
router.use('/channels', channelRouter);
router.use('/members', memberRouter);
export default router;