import 'dotenv/config';
import express from "express";
import morgan from 'morgan'
import errorMiddleware from './middlewares/errorMiddleware';
import jobRouter from './routes/jobs';
import createHttpError from 'http-errors';
import cors from 'cors';
import session from 'express-session';
import userRouter from './routes/user'
import env from './util/validEnv';
import MongoStore from 'connect-mongo';


const app = express();

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(express.json());
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(session({
    secret:env.SESSION_SECRET,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:60*60*1000
    },
    rolling:true,
    store:MongoStore.create({
        mongoUrl:env.MONGO_CONN
    })
}))

//Routes
app.use('/api/user',userRouter);
app.use('/api/jobs',jobRouter);

//Middleware for handling bad requests
app.use((req,res,next)=>{
    next(createHttpError(404,"Endpoint don't found"))
})
   
//Error Middleware
app.use(errorMiddleware)

export default app;