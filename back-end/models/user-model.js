import { Schema } from "mongoose";
const userSchema = new Schema({
    'email':{
        type:String,
        required:true,
        unique:true

    },
    'password':{
        type:String,
        minlength:8,
        required:true
    },
    'name':{
        type:String,
        required:true
    },
    'status':{
        type:String,
        default:'A'

    },
    'date':{
        type:Date,
        default:Date.now
    }

});
export const userModel = mongoose.model('users',userSchema);