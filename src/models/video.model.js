import mongoose,{Schema} from "mongoose"
import mongooseAggregetepaginate from "mongoose-aggregate-paginate"
const videoSchema = new Schema({
    videofile:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    titale:{
        type:String,
        required:true
    },
    description:{
        type:String,
        
    },

    view:{
        type:Number,
        default:0

    },
    ispublished:{
        type:Boolean,
        default:true
    },
    owner:{
        type : Schema.Types.ObjectId,
        ref:"User"

    }
    
},{timestamps : true})
videoSchema.plugin(mongooseAggregetepaginate)
export const Video = mongoose.model("Video",videoSchema)