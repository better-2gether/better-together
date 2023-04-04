import express from 'express';
import path from 'path';
import mongoose from 'mongoose';

//workaround for using dirname in esModule
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//configure express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;

//import routers
import userRouter from './routes/userRoutes.js';
import orgRouter from './routes/orgRoutes.js';
import dataRouter from './routes/dataRoutes.js';

//establish connection to database
const URI =
'mongodb+srv://Elastic9034:hyqZd4uUjXzVqEck@cluster0.bjfx208.mongodb.net/?retryWrites=true&w=majority';

async function connect() {
  try {
    await mongoose.connect(URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to the database: ', error);
  }
}

connect();

//Serve static files from the build folder
app.use(express.static(path.join(__dirname, '../build')));

//define route handlers
// app.use('/api', apiRouter);
app.use('/api/users', userRouter);
app.use('/api/orgs', orgRouter);
app.use('/api/data', dataRouter);


// route handler to respond with main app
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

//test route
app.get('/api/data', (req, res) => {
  const data = { message: 'Hello from the backend prove it' };
  res.status(200).json(data);
});

// Handle all other requests with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
