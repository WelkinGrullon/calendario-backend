import { User } from "../models/Schemas.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {jwtSecret} from "../server.js";
export async function verifyJwt(req, res, next) {
    const token = req.headers["x-access-token"];
    if (!token) {
        res.send("Token needed");
    } else {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                res.json({ auth: false, status: "failed" });
            } else {
                req.userId = decoded.id;
                next();
            }
        });
    }
}
export const login_post = async function(req, res, next){
    try{
        const {email, password} = req.body
        console.log(req.body)
    const user = await User.findOne({email});
    if (!user){
        return res.json({error: "User not found", auth:false, status:'error'})
    }
    if (await bcrypt.compare(password,user.password)){
        const token = jwt.sign({},jwtSecret, {
            expiresIn:600,

        });
        if (res.status(201)){
            return res.json({status:"ok",token:token, auth:true, result:user})
        } else {
            return res.json({error:"error, try again, later", auth:false})
        }
    }
    res.json({status:"error", error:"Invalid password"})
} catch {
    err => res.status(401).send(err)
}
};
export function isUserAuthed(req, res) {
    res.send(true);
    
}