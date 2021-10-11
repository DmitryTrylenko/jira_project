import  express from 'express';
import  mongoose from 'mongoose';
import { config } from './configs/config';
import { authRouter } from './auth/auth.router';
import { statusRouter } from './status/status.router';
import { priorityRouter } from './priority/priority.router';
import { ticketRouter } from './ticket/ticket.router';
import { ticketsListRouter } from './tickets-list/tickets-list.router';
import { authJWT } from './services/authenticateJWT';
import { usersRouter } from './users/users.router';

const PORT: string | number = process.env.PORT || 3000;

const app = express();

async function start() {
	try {
		await mongoose.connect(config.dbURL, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
		console.log('DB was connected');
		app.listen(PORT, () => {
			console.log('Server has been started...');
		});
	} catch (err) {
		console.log(err);
	}
}

start();

app.use((req: any, res: any, next: any) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	next();
});

app.use(express.json());
app.use('/auth', authRouter);
app.use(authJWT);
app.use('/users', usersRouter);
app.use('/statuses', statusRouter);
app.use('/priorities', priorityRouter);
app.use('/ticket', ticketRouter);
app.use('/tickets-list', ticketsListRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
