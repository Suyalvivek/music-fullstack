import { UserModel } from "../models/user-model.js";
import {
  compareHash,
  encryptPassword,
} from "../utils/services/password-hash.js";
import { generateToken } from "../utils/services/token.js";
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
    const doc = await UserModel.findOne({ email: userObject.email}).exec();
    console.log(doc);
    if (doc && doc._id) {
      const token = generateToken(doc.email);
      console.log(token);
      if (compareHash(userObject.password, doc.password)) {
        return {
          message: "Welcome" + doc.username,
          role: doc.role,
          token: token,
        };
      } else {
        return "Invalid Credentials";
      }
    } else {
      return "Invalid Credentials";
    }
  } catch (error) {
    throw new Error("Invalid Credentials");
  }
};
