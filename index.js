import express from 'express' ;
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

import {userRoutes} from "./routes/UserRoutes.js";
import {authRouter} from "./routes/AuthRoutes.js";
app.use(userRoutes);
app.use(authRouter);

// const notFoundMiddleware = require('./middlewares/notFound.middleware');
// const errorMiddleware = require('./middlewares/errorMiddleware');
// app.use(notFoundMiddleware);
// app.use(errorMiddleware);

mongoose
    .connect(`mongodb://${process.env.DB_URL}/${process.env.DB_NAME}`)
    .then(() => {
        app.listen(process.env.APP_PORT, () => {
            console.log(`Server started on: http://127.0.0.1:${process.env.APP_PORT}`)
        });
    })
    .catch(() => {
        console.log("Could not connect to database");
    });