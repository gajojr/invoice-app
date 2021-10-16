import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { AppRouter } from './AppRouter';
import './controllers/AuthController/AuthController';

const app = express();

const PORT = process.env.PORT || 5000;

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(AppRouter.getInstance());
app.use(helmet());

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});