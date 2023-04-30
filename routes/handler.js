import express from 'express';
export const loginRoute = express.Router();
import { signup_post } from '../controllers/registerController.js';
import { event_post } from '../controllers/eventController.js';
import  {login_post, verifyJwt, isUserAuthed}  from '../controllers/logInController.js';
import { create_group, group_add_user, group_delete, group_get, group_leave_user, group_users_find } from '../controllers/groupController.js';
import getCurrentUser from '../controllers/userController.js';
loginRoute.post('/users/new', signup_post );
loginRoute.post('/users',login_post);
loginRoute.get('/authUser', verifyJwt, isUserAuthed);
loginRoute.post('/eventAdd', event_post )
loginRoute.post('/groups/new', create_group)
loginRoute.post('/groups/find', group_get);
loginRoute.post('/groups/finduser', group_users_find )
loginRoute.post('/users/find', getCurrentUser);
loginRoute.post('/groups/adduser', group_add_user );
loginRoute.post('/groups/leave', group_leave_user);
loginRoute.post('/groups/delete', group_delete)