/* eslint-disable object-curly-newline */
import express from 'express';
import { authJWT } from '../services/authenticateJWT';
import { loginHandler, refreshHandler, logoutHandler, registrationHandler } from './auth.controller';

export const authRouter = express.Router();

authRouter.post('/registration', registrationHandler);
authRouter.post('/login', loginHandler);
authRouter.post('/refresh', refreshHandler);
authRouter.post('/logout', authJWT, logoutHandler);
