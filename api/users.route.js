import express from 'express';
import UsersCtrl from './users.controller.js';
import Middleware from '../middleware/authenticateToken.js';

const usersRouter = express.Router();

usersRouter.route('/create').post(UsersCtrl.createUser);
usersRouter.route('/login').post(UsersCtrl.login);
usersRouter.route('/get-profile').get(Middleware.authenticateToken, UsersCtrl.getUserProfile);
usersRouter.route('/update-user/:userId').put(Middleware.authenticateToken, UsersCtrl.updateUserProfile);
usersRouter.route('/delete-user/:userId').delete(Middleware.authenticateToken, UsersCtrl.deleteUserProfile);

export default usersRouter;