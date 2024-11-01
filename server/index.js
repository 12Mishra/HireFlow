import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connect from './connection.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js';
import recruiterRouter from './routes/recruiter.route.js';
import jobRouter from './routes/job.route.js';
import cors from 'cors'

const app=express();
const PORT=process.env.PORT;

connect(process.env.MONGO_URI).then(()=>{
    console.log("db connected");
}).catch((err)=>{
    console.log("Error occured", err);
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}
))


app.use('/user', userRouter);
app.use('/recruiter', recruiterRouter);
app.use('/jobs', jobRouter);

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})

