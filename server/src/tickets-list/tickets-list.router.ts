import express from 'express';
import { getTicketsHandler } from './tickets-list.controller';

export const ticketsListRouter = express.Router();

ticketsListRouter.get('', getTicketsHandler);
