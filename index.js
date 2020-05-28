import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes';

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1', routes);
app.get('/', (req, res) =>
  res.status(200).json({
    message: 'Projects api',
  })
);

app.all('*', (req, res) =>
  res.status(404).json({
    error: 'Page not found.',
  })
);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${process.env.PORT}`);
});

export default app;
