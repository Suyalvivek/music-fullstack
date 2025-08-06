import { register as registerUser } from "../services/user-service.js";
import { login as loginUser } from "../services/user-service.js";
import logger from "../utils/logger.js";
export const login = async (req, res) => {
    const userObject = req.body;
    try {
        const obj = await loginUser(userObject);
        logger.info('User login successful', { email: userObject.email });
        res.status(200).json(obj);
    } catch (error) {
        logger.error('Login error', { error: error.message, email: userObject.email });
        res.status(500).json({message:"Error During Login,Server Error"});       
    }
};

export const register = async(req, res) => {
    const userObject = req.body;
    try {
        logger.info('User registration attempt', { email: userObject.email });
        const message = await registerUser(userObject);
        logger.info('User registration successful', { email: userObject.email });
        res.status(200).json({message:message});
    } catch (error) {
        logger.error('Registration error', { error: error.message, email: userObject.email });
        res.status(500).json({message:"Error During Register,Server Error"});
    }
};

export const profile = (req, res) => {
    logger.debug('User profile accessed', { user: req.headers['authorization'] });
    res.json({message:"User Profile"});
};