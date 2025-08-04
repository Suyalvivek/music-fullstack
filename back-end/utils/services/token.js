import jwt from "jsonwebtoken";
export const generateToken=(email)=>{
    console.log('inside generate token')
    const token=jwt.sign({email:email},process.env.JWT_SECRET,{expiresIn:'1d'});
    console.log(token);
    return token
};
export const verifyToken=(token)=>{
    const decode = jwt.verify(token,process.env.JWT_SECRET);
    return decode.email
};