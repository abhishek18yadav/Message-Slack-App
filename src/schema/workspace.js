import mongoose from 'mongoose';

const workspaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'workspace name is required'],
        unique: true,
    },
    description: {
        type: String,
    },
    members: [
        {
            memberId: {
                type: mongoose.Schema.ObjectId,
                ref: 'User'
            },
            role: {
                type: String,
                enum: ['admin', 'member'],
                default: 'member'
            }
        }
    ],
    joinCode: {
        type: String,
        required: [true, 'Join Code is required']
    },
    channels: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Channel'
        }
    ]
});
const WorkSpace = mongoose.model('Workspace', workspaceSchema);
export default WorkSpace;