import express, { request } from "express";
import { PORT, mongoURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import pedidosRoute from './routes/pedidosRoute.js';
import cors from 'cors';

const app = express();

// parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow all origins with default of cors(*)
app.use(cors());
// Option 2: Allow custom origins
/* app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET','POST','PUT','DELETE'],
        allowedHeaders: ['Content-Type'],
    })
) */

app.get('/', (request, response)=>{
    console.log(request);
    return response.status(234).send('Welcome to MERN stack tutorial')
});

app.use('/books', booksRoute);
app.use('/pedidos', pedidosRoute);

mongoose
    .connect(mongoURL)
    .then(()=>{
        console.log('App connected to database');
        app.listen(PORT, ()=>{
                console.log(`App listening to port: ${ PORT }`);
        });
    })
    .catch((error)=>{
        console.log(error)
    })