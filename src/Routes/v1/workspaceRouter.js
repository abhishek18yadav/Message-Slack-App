import express from 'express';
import { createworkspaceController, deleteWorkspaceController, getWorkspaceUserIsMemberOfController } from '../../controllers/workspaceController.js';
import isAuthenticated from '../../middlewares/authMiddleware.js'
import { validate } from '../../Validators/zodValidators.js';
import createworkspaceSchema from '../../Validators/workspaceSchema.js'
const router = express.Router();

router.post('/', isAuthenticated, validate(createworkspaceSchema), createworkspaceController);
router.get('/', isAuthenticated, getWorkspaceUserIsMemberOfController);
router.delete('/:workspaceId', isAuthenticated, deleteWorkspaceController);

export default router;