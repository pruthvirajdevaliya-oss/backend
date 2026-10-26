import{asynchendler} from '../utils/asynchendler.js'
import {apierr} from '../utils/apierr.js'
import {User} from '../models/user.models.js'
import {Video} from '../models/video.model.js'
import {uploadImage} from '../utils/upload.js'
import { apiresponse } from '../utils/apiresponse.js'

const videoupload = asynchendler(async (req,res)=>{


    const {titale,description} = req.body
    const videolocal = req.files?.video[0]?.path
    const thumbnaillocal = req.files?.thumbnail[0]?.path
    if(!videolocal){
        throw new apierr(400,"video cant resive")
    }
    if(!thumbnaillocal){
        throw new apierr(400,"thumbnail is missing")
    }
    const video = await uploadImage(videolocal)
    const thumbnail = await uploadImage(thumbnaillocal)
    if(!(video,thumbnail)){
        throw new apierr(500,"err in upload")
    }
    if((titale.trim()).lenght == 0 ){
        throw new apierr(401,"tital must be requird")
    }
    const userid = req.user?._id
    if (!userid){
        throw new apierr(500,"cant find user id")
    }
    await Video.create({
        videofile:video.url,
        thumbnail:thumbnail.url,
        titale,
        description,
        owner:userid
    })
   return res.status(200).json(new apiresponse(200,"video uploaded sucssefully"))

})

export {videoupload}