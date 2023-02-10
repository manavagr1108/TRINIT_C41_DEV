import express from 'express';
import { createLogger, format, transports } from 'winston';
import connectDB from "./config/connectDatabase.js";
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();

connectDB();

const app = express();
app.use(
    cors(
        //     {
        //     origin: [
        //       "http://localhost:3000",
        //       process.env.FRONTEND_URL
        //     ],
        //     credentials: true,
        //   }
    )
);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cookieParser())
// Set up Winston for logging
const logger = createLogger({
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    defaultMeta: { service: 'vortex23-backend' },
    transports: [
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'combined.log' })
    ]
});
export default logger;

// Start the server
app.listen(process.env.PORT || 4000, () => {
    console.log('Server running')
    logger.info('Server listening on port ' + (process.env.PORT));
});


import userRoute from "./routes/userRoute.js"
app.use("", userRoute);