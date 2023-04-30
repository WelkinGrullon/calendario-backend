import { User } from '../models/Schemas.js';
export const  handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: ''};

    if (err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    } else if (err.code === 11000){
        errors.email = 'A user with that email already exists'
        return errors;
    }
    return errors;
      } 
export const signup_post = async function(req, res, next){
    const user =
     {
        email:req.body.email,
        fName:req.body.fName,
        lName:req.body.lName,
        password:req.body.password
    };
    const newUser = new User(user);

    try {
        await User.create({ email:req.body.email,
            fName:req.body.fName,
            lName:req.body.lName,
            password:req.body.password});
        res.status(200).send(newUser);
    }  catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors})
    }
  };
