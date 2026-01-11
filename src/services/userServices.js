import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

import userRepository from '../repositiorires/userRepository.js'
import {createJWT} from '../utils/common/authUtils.js'
import ClientError from '../utils/errors/clientError.js';
import ValidationError from '../utils/errors/validationErrors.js';

export const signUpService = async(data) => {
    try {
        const newUser = await userRepository.create(data);
        return newUser;
    } catch (error) {
        if (error.name === 'ValidationError') {
            throw new ValidationError({ error: error.errors },error.message);
        }
        if (error.name === 'MongoServerError' && error.code === 11000) {
            throw new ValidationError(
                { error: ['A user with same email or username already exist'] },
                'user alredy exist'
            )
        }

    }
}
export const signInServices = async (data) => {
    try {
        const user = await userRepository.getByEmail(data.email);
        if (!user) {
            throw new ClientError({
                message: 'no registered user found',
                statuscode: StatusCodes.BAD_REQUEST,
                explaination: 'invalid data sent by client'
            })
        }
        const inMatch = bcrypt.compareSync(data.password, user.password);
        if (inMatch) {
            console.log("user is", inMatch);
            throw new ClientError({
                message: `invalid password! please try again`,
                statuscode: StatusCodes.BAD_REQUEST,
                explaination: 'invalid data sent from client'
            });
        }
        return {
            username: user.username,
            password: user.password,
            email: user.email,
            avatar: user.avatar,
            token: createJWT({id:user._id,email:user.email})
        };
    } catch (error) {
        console.log('user service error', error);
        throw error;
    }
};