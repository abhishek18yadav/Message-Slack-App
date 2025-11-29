import express from 'express';
import validate from '../../Validators/zodValidators.js'
import {signIn, signup} from "../../controllers/userController.js"
import { userSignUpSchema , userSignInSchema } from '../../Validators/userSchema.js';

const router = express.Router();

router.post('/signup',validate(userSignUpSchema), signup);
router.post('/signin', validate(userSignInSchema), signIn);

export default router;