import {User} from "../models/user.models.js"
import {regiteruser} from '../controler/user.controler.js'
import {apierr} from '../utils/apierr.js'
import { asynchendler } from "../utils/asynchendler.js"
import jwt from "jsonwebtoken"
export const veryfaccess = asynchendler(async(req,res,next)=>{
   const accesstoken = req.cookies?.accesstoken||req.header("authorization")?.replace("Bearer ","")
    if(!accesstoken){
        throw new apierr(401,"access token is unavailable")
    }
const verify = jwt.verify(accesstoken,process.env.ACCSEEC_TOKEN)
if(!verify){
    throw new apierr(401,"unauthorized")
}
const user = await User.findById(verify._id).select("-password -refreshtokens")
if (!user){
    throw new apierr(404,"user not found")
}
req.user = user
next()


})