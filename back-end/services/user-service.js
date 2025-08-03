import { UserModel } from "../models/user-model.js";
import { comapreHash, encryptPassword } from "../utils/services/password-hash.js";
export const register =async(userObject)=>{
    try {
    userObject.password = encryptPassword(userObject.password);
    const doc = await UserModel.create(userObject);
    if(doc && doc._id){
        return "User Register";
    }
} catch (error) {
    throw error
}

}
export const login = async(userObject)=>{
    try {
         const doc = await UserModel.findOne({email:userObject.email}).exec();
    if(doc && doc._id){
        if(comapreHash(userObject.password,doc.password)){
            return "Welcome"+doc.username;
        }
        else{
            return "Invalid Credentials";
        }

        
    }
    else{
        return "Invalid Credentials";
    }
    } catch (error) {
        throw new Error("Invalid Credentials");
    }
   
}
