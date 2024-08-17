import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import userRought from './src/user/userRoute.js';
import cors from 'cors';
import session from 'express-session';



const app = express();
dotenv.config();

//middleware
app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,                      
    saveUninitialized: true,            
    cookie: { secure: false }           
  }));


app.use(cors());

app.use('/api/user',userRought)



export default app;