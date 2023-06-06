const express = require('express');
const postRouter = express.Router();

// Controllers Location
const {
        allPostsController,
        createNewPostController,
        updateTextOrImagePostController,
        deletePostController,
        likePostController,
        commentOnPostController,
        detailsOfPostController
      } = require('../controllers/postController');
      
// Middleware Location
const { authentication } = require('../middlewares/authenticationMiddleware');


// TThis endpoint should return a list of all posts.
postRouter.get('/posts' , allPostsController);

// This endpoint should allow the user to create a new post. (Protected Route)
postRouter.post('/posts' , authentication , createNewPostController);

// This endpoint should allow users to update the text or image of a specific post identified by its ID. (Protected Route)
postRouter.patch('/posts/:id' , authentication , updateTextOrImagePostController);

// This endpoint should allow users to delete a specific post identified by its ID. (Protected Route)
postRouter.delete('/posts/:id' , authentication , deletePostController);

// This endpoint should allow users to like a specific post identified by its ID. (Protected Route)
postRouter.post('/posts/:id/like' , authentication , likePostController);

// This endpoint should allow users to comment on a specific post identified by its ID. (Protected Route)
postRouter.post('/posts/:id/comment' , authentication , commentOnPostController);

// This endpoint should return the details of a specific post identified by its ID.
postRouter.get('/posts/:id' , detailsOfPostController);


module.exports = { postRouter };