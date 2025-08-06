import { Schema, mongoose } from "mongoose";
const songSchema = new Schema({
    'title':{
        type:String,
        required:true
    },
    'desc':{
        type:String,
        minLength:10,
        required:true,

    },
    'image':{
        type:String,
        required:true
    },
    'audiourl':{
        type:String,

    },
    'status':{
        type:String,
        default:'A'

    }
});
export const SongModel = mongoose.model('songs',songSchema);