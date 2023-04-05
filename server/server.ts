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
  'mongodb+srv://admin:bettertogether@cluster0.iwftg38.mongodb.net/?retryWrites=true&w=majority';

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

// unkown route
app.use((err, req, res, next) => {
  console.log(err.log);
  res.status(404).send(err.message);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
