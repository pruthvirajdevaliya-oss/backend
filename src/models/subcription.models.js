import mongoose, {Schema} from "mongoose";
const subcriptionschema = new Schema({
    subcriber:{
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    chenal : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
},{timestamps : true})
export const subcription = mongoose.model("subcription",subcriptionschema)