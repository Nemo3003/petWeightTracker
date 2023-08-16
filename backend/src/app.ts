// src/app.ts
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import swaggerRoutes from './routes/swagger';
import indexRoutes from './routes/index';
import connectToMongoDB from './config/database';

const app = express();

// Middleware for handling CORS headers
app.use(cors());

// Middleware for parsing JSON request bodies
app.use(express.json());

app.use(cors({
  origin: '*',
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
}));
// Routes
app.use('/', indexRoutes);

(async () => {
    try {
      await connectToMongoDB();
      const port = 3000;
      app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
      });
    } catch (error) {
      console.error('Error starting the server:', error);
      process.exit(1);
    }
  })();