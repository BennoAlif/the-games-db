import express, { Application, urlencoded, json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes';

dotenv.config();

const app: Application = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use('/images', express.static('images'));
app.use(router);

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Hello world' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});

export default app;
