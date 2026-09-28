import express from 'express';
import cors from 'cors';
import cookieparser from 'cookie-parser';
const app = express();
app.use (cors({
    origin: process.env.CORS_ORIGIN,
    credentials : true
}))
app.use(express.json({limit:'25kb'}))
app.use(express.urlencoded({extended:true,limit:'10kb'}))
app.use(express.static('public'))
app.use(cookieparser())
//router
import userrouter from './routes/user.rout.js'

app.use('/api/v1/user',userrouter)

export {app}