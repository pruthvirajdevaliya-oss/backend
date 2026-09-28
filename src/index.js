import dns from 'node:dns';
dns.setServers(['8.8.8.8','8.8.4.4'])
import 'dotenv/config';
// dotenv.config(
//   {path:'./env'}
// );

// import mongoose from "mongoose";
// import {DB_NAME} from "./constants.js";
// import express from "express";
// const app = express();
import {app} from './app.js'
import connectDB from "./db/db_conect.js";


connectDB().//async await retun a promise 
//so we can use then catch to handle the promise
then( ()=>{
  console.log("connected to mongodb")
  app.on("error",(error)=>{
    console.log("error",error)
    throw error
    })
  app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
  })
}).
catch((err)=>{
  console.log(`error in conection to mongodb ${err}`)
})




/*
(async ()=>{
  try{
   await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
   app.on("error",(error)=>{
    console.log("error",error)
    throw error
    })
    app.listen(process.env.PORT,()=>{
      console.log(`server is running on port ${process.env.PORT}`)
    })

  } catch (error) {
    console.log("erooer", error)
    throw error
  }
})()*/
