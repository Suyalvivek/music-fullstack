import express from "express";
import { indexRoute } from "./api/v1/routes/index.js";
import { Error404 } from "./utils/middlewares/404.js";
import cors from "cors"
import { createConnection } from "./utils/db/connection.js";
import dotenv from 'dotenv';
import fileUpload from "express-fileupload";
import { apiLimiter } from "./utils/middlewares/rate-limiter.js";
import logger from "./utils/logger.js";
import { requestLogger } from "./utils/middlewares/request-logger.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure logs directory exists
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const app = express();
dotenv.config();

// Initialize logger
logger.info('Server initializing...');

// Apply request logger middleware
app.use(requestLogger);

// Apply general rate limiter to all API routes
app.use('/api/', apiLimiter);

app.use(cors());
app.use('/upload',express.static("upload"));
app.use(fileUpload({limits:{fileSize:10*1024*1024}}));
app.use(express.json());

app.use('/api/v1/', indexRoute);

app.use(Error404);
const PORT = process.env.PORT || 4000;
const promise = createConnection();
promise.then(() => {
  const server = app.listen(PORT, (err) => {
    if (err) {
      logger.error("Error in starting server", { error: err });
    } else {
      logger.info("DB connected successfully");
      logger.info(`Server up and running on port ${server.address().port}`);
    }
  });
}).catch((err) => {
  logger.error("Error in connecting to DB", { error: err });
});
