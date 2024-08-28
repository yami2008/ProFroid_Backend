import express from 'express' ;
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use('/public' , express.static('./public'));

app.use(express.json());
app.use(cors());

import {userRoutes} from "./routes/UserRoutes.js";
import {authRouter} from "./routes/AuthRoutes.js";
import {coldApplianceRoutes} from "./routes/ColdApplianceRoutes.js";
import {factureRouter} from "./routes/FactureRoute.js";
app.use(userRoutes);
app.use(authRouter);
app.use(coldApplianceRoutes);
app.use(factureRouter);

import {routeNotFoundMiddleware} from "./middlewares/vendor/RouteNotFoundMiddleware.js";
import {errorMiddleware} from "./middlewares/vendor/ErrorMiddleware.js";
app.use(routeNotFoundMiddleware);
app.use(errorMiddleware);

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