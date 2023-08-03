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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });
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