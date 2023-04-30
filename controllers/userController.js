import { User } from "../models/Schemas.js";

export default async function getCurrentUser(req, res){
    try{const {user} = req.body;
    const theUser = await User.findById(user);
    console.log(theUser)
    res.status(200).send(theUser)}
    catch {
        err => console.log(err)
    }
}