import express from 'express';
import { getPrioritiesHandler } from './priority.controller';

export const priorityRouter = express.Router();

priorityRouter.get('', getPrioritiesHandler);
