import express from 'express';
import bodyParser from 'body-parser';
import { loginRoute } from './routes/handler.js';
import mongoose from 'mongoose';
import  dotenv from 'dotenv'
import cors from 'cors';
dotenv.config();
const dater = new Date().toLocaleDateString()
export const jwtSecret = process.env.JWT_SECRET
const mongoUrl = process.env.DB_URL
const PORT = process.env.PORT
const app = express();
app.use(cors());
app.use(express.json())
app.use('/', loginRoute);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
mongoose.connect(mongoUrl)
.then(()=>{
    console.log('connection made')
})
.catch((err)=>{
    console.log(err)
});
app.get('/', (req, res)=>{
    res.send('<h1>hell world</h1>')
})
app.listen(PORT || 4002, ()=>{
    console.log('listening on port '+(PORT || 4002), dater);
});
