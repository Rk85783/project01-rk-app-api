import 'dotenv/config';
import express from 'express';
import connectDB from './db/index.js';
import router from './routes/app.route.js';
const app = express();

// Database connection
connectDB();

// Middlewares
app.use(express.json());
app.use('/api', router);

const port = process.env.APP_PORT || 4001;
app.listen(port, () => {
  console.log(`${process.env.APP_NAME} is running at http://localhost:${port}`);
});