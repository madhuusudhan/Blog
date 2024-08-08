import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRoutes.js'
import postRouter from './routes/postRoutes.js'
import commentRouter from './routes/commentRoutes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL).then(() =>{
    console.log("database is connected")
})
.catch((err) => {
    console.log(err);
})
const __dirname = path.resolve();
app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/post', postRouter);
app.use('/api/comment', commentRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
});

app.listen(3000,() => {
    console.log("Server is running on 3000")
});