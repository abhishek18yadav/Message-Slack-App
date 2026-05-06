
import cors from 'cors'
import express from 'express'
import {createServer} from 'http'
// import StatusCode from 'http-status-codes';
import { Server } from 'socket.io';

import bullServerApater from '../src/config/bullBoardConfig.js'
import connectDb from './config/mongoconfig.js';
import channelSocketHandler from './controllers/channelSocketController.js';
import MessageSocketHandler from './controllers/messageSocketController.js';
import apiRouter from './Routes/apiRouter.js';

const app = express();
const server = createServer(app);
const PORT = 3000;
const io = new Server(server, {
  cors: {
    origin:'*'
  }
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/ui', bullServerApater.getRouter());
app.use(cors());
app.use('/api', apiRouter);


// app.get('/ping', (req, res) => {
//     return res.status(StatusCode.OK).json({ message: 'pong' });
// }) ----> just a testcase

io.on('connection', (socket) => {
  MessageSocketHandler(io, socket);
  channelSocketHandler(io, socket);
})

server.listen(PORT, async () => {
  console.log(`Server ois running on port ${PORT}`);
  connectDb();
})