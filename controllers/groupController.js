
import { User, Group } from "../models/Schemas.js";
export async function create_group(req, res){
    const {name, user} = req.body;
    try{
        const group = {name};
        const newGroup = new Group(group);
        newGroup.users.push(user)
        newGroup.save();
        const theUser = await User.findById(user);
        theUser.groups.push(newGroup);
        console.log(theUser)
        theUser.save();
        const theUserNew = await User.findById(user)
        res.status(200).send(theUserNew)
    }
    catch{
        res.status(400).send('an error has occured')
    }
   
}

export async function group_get(req, res){
    try{ 
        const {_id} = req.body;
    const theGroup = await Group.findById(_id);
    console.log(theGroup)
    res.status(200).send(theGroup)
    }
    catch {
        err => console.log(err)
    }
    
}
export async function group_users_find(req, res){
    try{
        const {user} = req.body;
    const foundUser = await User.findById(user);
    console.log(foundUser)
    res.status(200).send(foundUser)
    } catch {
       err => connsole.log(err)
    }
    
}
export async function group_add_user(req,res){
    try {
        const {group, user} = req.body;
        const foundGroup = await Group.findById(group);
        const exists = await Group.find({users:(user)});
        if (exists.length === 0){
            foundGroup.users.push(user);
            const foundUser = await User.findById(user);
            foundUser.groups.push(group);
            foundGroup.save();
            foundUser.save();
            res.status(200).send(foundUser)
        } else{
            res.status(201).send('User is already in group')
        }
        //const foundUser = await User.findById(user);
        //foundUser.groups.push(group);
        //foundUser.save();
        //res.status(200).send(foundGroup)
    }
    catch{
        (err) => console.log(err)
    }
};
export async function group_leave_user(req, res){
   try {const {group, user} = req.body;
   const foundUser = await User.findById(user);
   const foundGroup = await Group.findById(group);
   foundUser.groups.pop(group);
   foundGroup.users.pop(user);
   foundGroup.save();
   foundUser.save();
   const newFoundUser = await User.findById(user)
    res.status(200).send(newFoundUser)}
    catch{
        err => console.log(err);
    }
}
export async function group_delete(req,res){
    try {
        const {group, user} = req.body
        const foundUser = await User.findById(user);
        foundUser.groups.pop(group);
        foundUser.save()
        const foundUserNew = await User.findById(user)
        await Group.deleteOne({_id: group});
        res.status(200).send(foundUserNew);
    }
    catch{
        err => console.log(err)
    }
}