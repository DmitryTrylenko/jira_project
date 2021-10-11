import express from 'express';

import { getUsersHandler } from './users.controller';

export const usersRouter = express.Router();

usersRouter.get('/', getUsersHandler);
