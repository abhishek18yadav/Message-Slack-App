
import { createMessageServices } from "../services/messageServices";
import { NEW_MESSAGE_EVENT, NEW_MESSAGE_RECIEVED_EVENT } from "../utils/common/eventConstants";


export default function messageHandler(io, socket) {
    socket.on(NEW_MESSAGE_EVENT, async function createMessageHandler(data, cb) {
        const messageResponse = await createMessageServices(data);
        socket.broadcast.emit(NEW_MESSAGE_RECIEVED_EVENT, messageResponse);
        cb({
            success: true,
            message: 'successfully created the message',
            data: messageResponse
        });
    });
}