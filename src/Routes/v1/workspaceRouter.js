import express from 'express';

import { addChannelToWorkspaceController, addMemberToWorkspaceController, createworkspaceController, deleteWorkspaceController, getWorkspaceByJoinCodeController, getWorkspaceController, getWorkspaceUserIsMemberOfController, updatedWorkspaceController } from '../../controllers/workspaceController.js';
import {isAuthenticated} from '../../middlewares/authMiddleware.js'
import { addChannelToWorkspaceSchema, addMemberToWorkspaceSchema,createWorkspaceSchema } from '../../Validators/workspaceSchema.js'
import { validate } from '../../Validators/zodValidators.js';
const router = express.Router();

router.post('/', isAuthenticated, validate(createWorkspaceSchema), createworkspaceController);
router.get('/', isAuthenticated, getWorkspaceUserIsMemberOfController);
router.delete('/:workspaceId', isAuthenticated, deleteWorkspaceController);
router.get(':workspaceId', isAuthenticated, getWorkspaceController);
router.get('/join/:joinCode', isAuthenticated, getWorkspaceByJoinCodeController);
router.put('/:workspaceId', isAuthenticated, updatedWorkspaceController);
router.put('/:workspaceId/members', isAuthenticated, validate(addMemberToWorkspaceSchema), addMemberToWorkspaceController);
router.put('/:workspaceId/channels', isAuthenticated, validate(addChannelToWorkspaceSchema), addChannelToWorkspaceController);
export default router;
