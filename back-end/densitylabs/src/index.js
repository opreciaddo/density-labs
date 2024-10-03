/* Entry file for the server */
import express from 'express';
import { PORT } from './config.js';
import morgan from 'morgan';
import cors from 'cors';
// Urls
import postsRoutes from './routes/posts.routes.js';


const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(postsRoutes);


app.listen(PORT);
console.log(`Server on port: ${PORT}`);
