import { Schema, mongoose } from "mongoose";
const userSchema = new Schema({
    'username':{
        type:String,
        required:true
    },
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
    'role':{
        type:String,
        default:'user'
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
export const UserModel = mongoose.model('users',userSchema);