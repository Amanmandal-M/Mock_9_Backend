const express = require('express');
const userRouter = express.Router();

// Controllers Location
const {
        registerUserController,
        loginUserController,
        allRegisteredUserController,
        friendsOfSingleUserController,
        sendFriendRequestToSingleUserController,
        acceptRejectRequestUserController
      } = require('../controllers/userController');

// Middleware Location 
const { authentication } = require('../middlewares/authenticationMiddleware');


// This endpoint should allow users to register. Hash the password on store.
userRouter.post('/register' , registerUserController);

// This endpoint should allow users to login. Return JWT token on successful login.
userRouter.post('/login' , loginUserController);

// This endpoint should return a list of all registered users. 
userRouter.get('/users' , allRegisteredUserController);

// This endpoint should return a list of all friends of a specific user identified by its ID.
userRouter.get('/users/:id/friends' , friendsOfSingleUserController);

// This endpoint should allow the user to send a friend request to another user identified by its ID. (Protected Route)
userRouter.post('/users/:id/friends' , authentication , sendFriendRequestToSingleUserController);

// This endpoint should allow users to accept or reject friend requests sent to them by another user identified by its ID. (Protected Route)
userRouter.patch('/users/:id/friends/:friendId' , authentication , acceptRejectRequestUserController);


module.exports = { userRouter };