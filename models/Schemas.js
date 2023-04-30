import mongoose, { Mongoose, mongo } from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import bcrypt from 'bcrypt'
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        validate: [isEmail, 'enter a valid email' ],
        unique: true,
        lowercase:true
    },
    fName:{
        type:String,
        required:true,
    },
    lName:{
        type:String,
        required:true
    },
    password:{
        type:String, 
        required: true,
        minLength: [6, 'password must be atleast 6 characters long']
    },
    groups:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Group',
    }],
    events:[{
        type:Object
    }]
});
userSchema.post('save', function(doc, next){
    next()
});
userSchema.pre('save', async function(next){
    if (!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt) 
    next()
})
const GroupSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }]
});
const EventSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    start:{
        required:true,
        type:Date,
        default: new Date(),
    },
    end:{
        type:Date
    }, 
    author:{
        type:String,
        required: true
    },
    description: {
        type: String
    },
    personalNotes: {
        type: String
    },
    display: {
        type: String
    }
});



const User = mongoose.model('User', userSchema, 'Users');
const Group = mongoose.model('Group', GroupSchema, 'groups');
const Event = mongoose.model('Event', EventSchema, 'events');

export {User, Group, Event};