import { verifyToken } from "../services/token.js";

export const auth = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log(token);
    if(!token){
        return res.status(401).json({message:"Unauthorized User"});
    }
    else{
        try {
        const email = verifyToken(token);
        next();//allow to go where user was going
            
        } catch (error) {
        return res.status(401).json({message:"Unauthorized User"});
            
        }
    }
};