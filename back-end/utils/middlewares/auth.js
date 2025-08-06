import { verifyToken } from "../services/token.js";
import logger from "../logger.js";
import { UserModel } from "../../models/user-model.js";

export const auth = async (req, res, next) => {
    const token = req.headers['authorization'];
    
    if(!token){
        logger.warn('Authorization attempt without token');
        return res.status(401).json({message:"Unauthorized User"});
    }
    else{
        try {
            const email = verifyToken(token);
            
            // Find user by email to get their ID
            const user = await UserModel.findOne({ email }).exec();
            if (!user) {
                logger.warn('User not found for authenticated token', { email });
                return res.status(401).json({message:"Unauthorized User"});
            }
            
            // Add user info to request object
            req.user = {
                id: user._id,
                email: user.email,
                role: user.role
            };
            
            logger.info('User authenticated', { email, userId: user._id });
            next(); // allow to go where user was going
        } catch (error) {
            logger.warn('Invalid token provided', { error: error.message });
            return res.status(401).json({message:"Unauthorized User"});
        }
    }
};