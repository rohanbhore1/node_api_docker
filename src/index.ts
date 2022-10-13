import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {HttpStatus} from './config/const';
import userRoutes from './route/user.route';
import accountRoutes from './route/account.route';
import logger from './util/logger';
dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;
export const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

//route for user details
app.use('/user', userRoutes);
//route for user account
app.use('/account', accountRoutes);

app.get('/', (req, res) => res.status(HttpStatus.OK.code).send({ status: HttpStatus.OK.status, message: 'ZIP API' }));
app.all('*', (req, res) => res.status(HttpStatus.NOT_FOUND.code)
.send({ status: HttpStatus.NOT_FOUND.status, message: 'Route does not exist on the server' }))

app.listen(PORT, () => logger.info(`Server running on: ${PORT}`));


