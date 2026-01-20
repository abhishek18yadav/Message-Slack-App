
import express from 'express'
// import StatusCode from 'http-status-codes';
import { Server } from 'socket.io';
import createServer from 'http-status-codes'
import bullServerApater from '../src/config/bullBoardConfig.js'
import connectDb from './config/mongoconfig.js';
import apiRouter from './Routes/apiRouter.js';
import messageHandler from './controllers/messageSocketController.js';


const app = express();
const server = createServer(app);
const PORT = 3000;
const io = new Server(app);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/ui', bullServerApater.getRouter());

app.use('/api', apiRouter);


// app.get('/ping', (req, res) => {
//     return res.status(StatusCode.OK).json({ message: 'pong' });
// }) ----> just a testcase

io.on('connection', (socket) => {
  messageHandler(io, socket);
})

server.listen(PORT, async () => {
  console.log(`Server ois running on port ${PORT}`);
  connectDb();
})