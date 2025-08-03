import bcrypt from "bcrypt";
export const encryptPassword = (plainPassword)=>{
    return bcrypt.hashSync(plainPassword,parseInt(process.env.SALT_ROUNDS))
}
export const comapreHash = (plainPassword,dbPassword)=>{
    return bcrypt.compareSync(plainPassword,dbPassword)
}