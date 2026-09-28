import mongoose,{Schema} from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema = new Schema({
    username:{
        type : String,
        required: true,
        lowerCase:true,
        unique : true,
        trim : true,
        index : true//for searching purpose
    },
    email:{
        type : String,
        required: true,
        index : true,
        
        },
    watchhistory:[
        {
          type:Schema.Types.ObjectId,
          ref:"Video"  
        }
    ],
    fullname:{
        type:String,
        index:true

    }   ,
    avatar:{
        type:String,
        required:false
    } ,
    coverImage:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    refreshtokens:{
        type:String,
    }
},{timestamps : true})
userSchema.pre("save",async function(){
    if(!this.isModified("password")) return ;
    this.password = await bcrypt.hash(this.password,8)
    
})
userSchema.methods.iscorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.creataccesstoken = async function (){
   return await jwt.sign(
        {
            _id:this._id,
            username:this.username,
            email:this.email,
            fullname:this.fullname
        },
        process.env.ACCSEEC_TOKEN,
        {
            expiresIn:process.env.ACCSEEC_EXP
        }
    )
}
userSchema.methods.creatrefreshtoken =  function(){
    return jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN,
        {
            expiresIn:process.env.REFRESH_EXP
        }
    )
}
export const User = mongoose.model("User",userSchema)

