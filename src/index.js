import express from 'express'
import StatusCode from 'http-status-codes';

import connectDb from './config/mongoconfig.js';
import apiRouter from './Routes/apiRouter.js';
const app = express();
const PORT = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/ping', (req, res) => {
    return res.status(StatusCode.OK).json({ message: 'pong' });
})
app.use('/api', apiRouter);
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
    connectDb();
})