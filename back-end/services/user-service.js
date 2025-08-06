import { UserModel } from "../models/user-model.js";
import {
  compareHash,
  encryptPassword,
} from "../utils/services/password-hash.js";
import { generateToken } from "../utils/services/token.js";
import logger from "../utils/logger.js";
export const register = async (userObject) => {
  try {
    userObject.password = encryptPassword(userObject.password);
    const doc = await UserModel.create(userObject);
    if (doc && doc._id) {
      return "User Register";
    }
  } catch (error) {
    throw error;
  }
};
export const login = async (userObject) => {
  try {
    logger.debug('Login attempt', { email: userObject.email });
    const doc = await UserModel.findOne({ email: userObject.email}).exec();
    
    if (doc && doc._id) {
      logger.debug('User found', { email: userObject.email });
      const token = generateToken(doc.email);
      
      if (compareHash(userObject.password, doc.password)) {
        logger.info('Login successful', { email: userObject.email, role: doc.role });
        return {
          message: "Welcome" + doc.username,
          role: doc.role,
          token: token,
        };
      } else {
        logger.warn('Invalid password', { email: userObject.email });
        return "Invalid Credentials";
      }
    } else {
      logger.warn('User not found', { email: userObject.email });
      return "Invalid Credentials";
    }
  } catch (error) {
    logger.error('Login error', { error: error.message, email: userObject.email });
    throw new Error("Invalid Credentials");
  }
};
