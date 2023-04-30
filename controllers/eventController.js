import {Event, User} from '../models/Schemas.js';
import { handleErrors } from './registerController.js';
export const event_post = async function(req, res, next){
    const {title, start, author, description, personalNotes, end, display, allDay, daysOfWeek} = req.body;
    const event ={
        title, start, allDay, display, daysOfWeek, end, description, personalNotes, author
    };
    const newEvent = new Event(event) ;
    try {
        await newEvent.save();
        const theUser = await User.findById(author);
        theUser.events.push(newEvent);
        theUser.save()
        console.log(theUser)
        console.log(newEvent)
        
        res.status(200).send(theUser)
    }  catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors})
    }


};
