import{asynchendler} from '../utils/asynchendler.js'
import {apierr} from '../utils/apierr.js'
import {User} from '../models/user.models.js'
import {uploadImage} from '../utils/upload.js'
import { apiresponse } from '../utils/apiresponse.js'



const option = {
  httpOnly:true,
  secure:true
}

// const crateacc = async (userid)=>{
//   const ok = userid
//   if(!ok){
//     throw new apierr(400,"user id is required")
//   }
//   try{
//     const user = await User.findById(userid)
//   if(!user){
//     throw new apierr(404,"user not found")
//   }
//     const accesstoken =  await user.creataccesstoken()
//     if(!accesstoken){
//       throw new apierr(500,"access token not created")
//     }
//     return accesstoken;
//   }
//   catch(error){
//     throw new apierr(500,`${error.message} access token generation failed`)
//   }}
// const createref = async (userid)=>{
//   try{
//     const user = await User.findById(userid)
//   if(!user){
//     throw new apierr(404,"user not found")
//   }
//     const refershtoken = user.creatrefreshtoken()
//     if(!refershtoken){
//       throw new apierr(500,"refresh token genrate faild")
//     }
//     return refershtoken;
//   }
//   catch(error){
//     throw new apierr(500,"refresh token genrate faild")
//   }}
const genrateaccessandrefereshtoken = async (userid)=>{
  try {
  const user =  await User.findById(userid)
  // if(user){
  //   console.log("user not found")
  // }
  const accesstoken = user.creataccesstoken()
  if(!accesstoken){
    console.log("access token genrate fail")
  }
  const refershtoken = user.creatrefreshtoken()
  
  if(!refershtoken){
    console.log ("refreshtoken genration task is not compalit")
  }
  console.log("token genrate user",user)
   user.refershtoken = refershtoken
   console.log(user)
 await user.save({ValidateBeforeSave: false})
 return {accesstoken,refershtoken}
  } catch (error) {
    throw new apierr(500,"token genrate faild")
  }
}







const regiteruser = asynchendler(async(req,res)=>{
    //get user details from req.body
    // chek data is valid
    // chek if user already exist
    // file chek for avtar and images
    // upload to cloudinary
    // chek avatar and image is uploaded
    // create user object  - create user in database
    // remove password and respone token
    // chek for user created
    // return send response




   const {fullname,email,username,password} = req.body
  //  console.log(fullname,email,username,password)
   if([fullname,email,username,password].some(field => field?.trim()==="")){
    throw new apierr(400,"All fields are required")


   }
    console.log (req.body)

   const us = await User.findOne({
    $or:[
        { email},
         { username}
    ]
   })
  // const us = await User.find()
   if(us){
    throw new apierr(409,"User with email or username already exists")
   }
   const avatarLocalPath = req.files?.avatar[0]?.path;
   const coverImageLocalPath = req.files?.coverImage[0]?.path;

   if(!avatarLocalPath || !coverImageLocalPath){
    throw new apierr(400,"Avatar and cover image are required")
   }
   const avatar = await uploadImage(avatarLocalPath);
   const coverImage = await uploadImage(coverImageLocalPath);
   if(!avatar || !coverImage){
    throw new apierr(500,"Image upload failed")
   }

 const user = await User.create({
    fullname,email,username,password,avatar: avatar.url,coverImage: coverImage.url
})
  const createdUser = await User.findById(user._id).select(
    "-password -refreshtokens"
  )
  if (!createdUser){
    throw new apierr(500,"User creation failed")
  }
  return res.status(201).json(new apiresponse(201,createdUser,"User created successfully"))

})
const loginuser = asynchendler(async (req,res)=>{
  // req.body => data
  // chek username or mail
  // chek password
  //access and refresh token 
  // cookies send 


  const {email,username,password}= req.body
  if (!username || !email){
    throw new apierr(400,"username or emali must be required")
  }
  const user =  await User.findOne({
    $or: [
      {username}, {email}
    ]
 } )
  if (!user){
    throw new apierr(401,"user is not registered")
  }
  // console.log(user)
 const passwordvaild = await user.iscorrect(password)
 if(!passwordvaild){
  throw new apierr(404,"password is incorrect")
 }
const {accesstoken,refershtoken} =await genrateaccessandrefereshtoken(user._id)

const loggedinuser = await User.findById(user._id).select("-password -refreshtokens")
return res.status(200)
.cookie("accesstoken",accesstoken,{
  httpOnly: true,
  secure: true
})
.cookie("refreshtoken",refershtoken,{
  httpOnly: true,
  secure: true
})
.json(new apiresponse(200,{
  user:loggedinuser,
  accesstoken,
  refershtoken
},"User login successfully"))

})
const logoutuser = asynchendler(async(req,res)=>{
  // get user from req.user
  // remove refresh token from database
  // clear cookies
  // send response
  await User.findByIdAndUpdate(req.user._id,{
    $set:{
      refreshtokens:""
    }
  },{
    new:true
  })
  res.status(200).
  clearcookie("accesstoken",accesstoken,{
    httpOnly:true,
    secure:true
  })
  .clearcookie("refreshtoken",refreshtoken,{
    httpOnly:true,
    secure:true
  })
  .json(new apiresponse(200,null,"User logout successfully"))
})
const refreshaccesstoken = asynchendler(async(req,res)=>{
  const refresh = req.cookies?.refershtoken||req.body?.refershtoken
  if(!refresh){
    throw new apierr(401,"anuthorized request")
  }
  const user = await User.findeById(refresh?._id)
  if(!user){
    throw new apierr(402,"user dosenot exist")
  }
  const {accesstoken,newrefershtoken} = await genrateaccessandrefereshtoken(user._id)
  user.refershtoken = newrefershtoken
  await user.Save({ValidateBeforeSave:false})
  return res.cookie("accesstoken",accesstoken)
  .cookie("refreshtoken",newrefershtoken)
  .json(new apiresponse(200,{
    refreshtoken,
    newrefershtoken
  },"new accestoken genration succses"))
})
export {regiteruser,loginuser,logoutuser}