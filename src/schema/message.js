import mongooose from 'mongoose';
const messageSchema = new mongooose.Schema({
    body: {
        type: String,
        reqired: [true, 'Meassage body is required']
    },
    image: {
        type: String,
    },
    channelId: {
        type: mongooose.Schema.ObjectId,
        ref: 'Channel',
        required: [true, 'Channel Id is required']
    },
    senderId: {
        type: mongooose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'sender id is required']
    },
    wordspaceId: {
        type: mongooose.Schema.ObjectId,
        ref: 'Workspace',
        reqired: [true, 'workspace id is required']
    }
});