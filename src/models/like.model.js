import mongoose, {model, Schema} from "mongoose"
const likeshema = new Schema({
    video:{
        type: Schema.Types.ObjectId,
        ref : "Video"
    },
    likebyuser :{
        type :Schema.Types.ObjectId,
        ref : "User"
    }
},{timestamps:true})
export const Like = mongoose.model("Like",likeschema)
