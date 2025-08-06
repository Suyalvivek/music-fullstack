import jwt from "jsonwebtoken";
import logger from "../../utils/logger.js";

export const generateToken=(email)=>{
    logger.debug('Generating token for user', { email });
    const token=jwt.sign({email:email},process.env.JWT_SECRET,{expiresIn:'1d'});
    return token;
};
export const verifyToken=(token)=>{
    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        logger.debug('Token verified successfully', { email: decode.email });
        return decode.email;
    } catch (error) {
        logger.error('Token verification failed', { error: error.message });
        throw error;
    }
};