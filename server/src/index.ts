import express, { Request, Response } from 'express';
import morgan from 'morgan';
import config from 'config';
import cors from 'cors';
import routes from './routes';
import connectDb from './utils/connectDb';
import authAndRefreshToken from './middleware/common/authAndRefreshToken';
import contentSecurityPolicy from './middleware/common/contentSecurityPolicy';
import corsOptions from './utils/corsOptions';
import checkAllowedOrigins from './middleware/common/checkAllowedOrigin';

const PORT = config.get('port');

const app = express();

app.use(contentSecurityPolicy());

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(checkAllowedOrigins);
// Cross Origin Resource Sharing
app.use(cors(corsOptions));

app.use(morgan('combined'));

app.use(express.json());

app.use(authAndRefreshToken);

app.use('/api/v1', routes);

app.use('*', (_req: Request, res: Response) => {
  res.status(404).send('Resource not found');
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectDb();
});
