import express from 'express';
import {
	createStatusHandler, deleteStatusHandler, findStatusHandler, getStatusesHandler, updateStatusHandler,
} from './status.controller';

export const statusRouter = express.Router();

statusRouter.get('/', getStatusesHandler);
statusRouter.get('/:id', findStatusHandler);
statusRouter.delete('/:id', deleteStatusHandler);
statusRouter.post('/', createStatusHandler);
statusRouter.put('/', updateStatusHandler);
