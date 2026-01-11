import express from 'express';

import {signIn, signup} from "../../controllers/userController.js"
import { userSignInSchema,userSignUpSchema  } from '../../Validators/userSchema.js';
import {validate} from '../../Validators/zodValidators.js'

const router = express.Router();

router.post('/signup',validate(userSignUpSchema), signup);
router.post('/signin', validate(userSignInSchema), signIn);

export default router;