import express from 'express';
import bodyParser from 'body-parser';
import linkRoutes from './routes/linkRoutes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', linkRoutes);

export default app;
