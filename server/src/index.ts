import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import { AppRouter } from './AppRouter';
import './controllers/AuthController/AuthController';
import './controllers/AvatarController/AvatarController';
import './controllers/InvoicesController/InvoicesController';
import './controllers/UserController/UserController';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
// app.use(express.static('./'));
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(AppRouter.getInstance());
app.use(helmet());

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});