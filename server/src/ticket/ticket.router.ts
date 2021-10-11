import express from 'express';
import {
	addTicketHandler, updateTicketHandler, findLatestTicketHandler,
} from './ticket.controller';

export const ticketRouter = express.Router();

ticketRouter.get('/latestNumber', findLatestTicketHandler);
ticketRouter.post('/new', addTicketHandler);
ticketRouter.put('/update', updateTicketHandler);
