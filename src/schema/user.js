import bcrypt from 'bcrypt'
import mongoose from 'mongoose';
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username required'],
        unique: [true, 'username already exist'],
        match: [
            /^[a-zA-Z0-9]+$/,
            'username must contain letters and numbers only'
        ],
        avatar: {
            type:String
        }
    },
    password: {
        type: String,
        required:[true , 'password required']
    },
    email: {
        type: String,
        unique: [true, 'email alredy selected'],
        required: [true, 'please enter your email'],
        match: [
            /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'incorrect format'
        ]
    }
});
userSchema.pre('save', function saveavatar(next) {
    const user = this;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hassehPassword = bcrypt.hash(user.password, salt);
    user.password = hassehPassword;
    user.avatar = ` https://robohash.org/${user.username}`;
    next();
})


const user = mongoose.model('User',userSchema);
export default user;