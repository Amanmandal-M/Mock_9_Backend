# Social Media App Backend

## About

<br>

This is Social media app Backend here user can register with valid credentials and user can add post , make friends , send friend request ,see all the friends lists and comment on their post , edit comment , delete comment and remove friend from friend lists.

<br>

## Clone a Repository

```
https://github.com/Amanmandal-M/Mock_9_Backend.git
```

## Installation

```
npm install
```

<strong>Note : </strong> Don't need to install packages if you only use this command all the packages automatically install if you want to add more packages then you have to write this command `npm install <your package name>`.

## Start the Backend server 

```
npm run start

npm run server

node index.js

nodemon start

nodemon index.js
```

<strong>Note : </strong> You can use any of them .

<br>

##  MVC Structure

```
├── index.js
├── configs
|    └── db.js
├── models
|    └── userModel.js
|    └── postModel.js
├── routes
|    └── userRoute.js
|    └── posttRoute.js
├──middlewares
|    └── authenticationMiddleware.js
├──controllers
|    └── userController.js
|    └── postController.js
```

<strong>Note : </strong> 

- Before doing anything first create `.env` file and put `PORT` , `MONGO_URL`.
- `PORT` is for listening the server.
- `MONGO_URL` is for running database and store your data in database so put your mongo link.

<br>

## Schema Design

<br>

<h3><strong>User Schema</strong><h3>

```
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String,
  dob: Date,
  bio: String,
  posts: [{ type: ObjectId, ref: 'Post' }],
  friends: [{ type: ObjectId, ref: 'User' }],
  friendRequests: [{ type: ObjectId, ref: 'User' }]
}
```

<h3><strong>Post Schema</strong><h3>

```
{
  _id: ObjectId,
  user: { type: ObjectId, ref: 'User' },
  text: String,
  image: String,
  createdAt: Date,
  likes: [{ type: ObjectId, ref: 'User' }],
  comments: [{
    user: { type: ObjectId, ref: 'User' },
    text: String,
    createdAt: Date
  }]
}
```

## Endpoints

<table>
    <thead>
        <tr>
            <th>METHOD</th>
            <th>ENDPOINT</th>
            <th>DESCRIPTION</th>
            <th>STATUS CODE</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>POST</td>
            <td>/api/register</td>
            <td>This endpoint should allow users to register. Hash the password on store.</td>
            <td>201</td>
        </tr>
        <tr>
            <td>POST</td>
            <td>/api/login</td>
            <td>This endpoint should allow users to login. Return JWT token on successful login</td>
            <td>201</td>
        </tr>
        <tr>
            <td>GET</td>
            <td>/api/users</td>
            <td>This endpoint should return a list of all registered users.</td>
            <td>200</td>
        </tr>
        <tr>
            <td>GET</td>
            <td>/api/users/:id/friends</td>
            <td>This endpoint should return a list of all registered users.</td>
            <td>200</td>
        </tr>
        <tr>
            <td>POST</td>
            <td>/api/users/:id/friends</td>
            <td>This endpoint should return a list of all friends of a specific user identified by its ID.</td>
            <td>201</td>
        </tr>
        <tr>
            <td>PUT / PATCH</td>
            <td>/api/users/:id/friends/:friendId</td>
            <td>This endpoint should allow the user to send a friend request to another user identified by its ID. (Protected Route)</td>
            <td>204</td>
        </tr>
        <tr>
            <td>GET</td>
            <td>/api/posts</td>
            <td>This endpoint should return a list of all posts.</td>
            <td>200</td>
        </tr>
        <tr>
            <td>POST</td>
            <td>/api/posts</td>
            <td>This endpoint should return a list of all posts.</td>
            <td>201</td>
        </tr>
        <tr>
            <td>PUT / PATCH</td>
            <td>/api/posts/:id</td>
            <td>This endpoint should allow users to update the text or image of a specific post identified by its ID. (Protected Route)</td>
            <td>204</td>
        </tr>
        <tr>
            <td>DELETE</td>
            <td>/api/posts/:id</td>
            <td>This endpoint should allow users to delete a specific post identified by its ID. (Protected Route)</td>
            <td>202</td>
        </tr>
        <tr>
            <td>POST</td>
            <td>/api/posts/:id/like</td>
            <td>This endpoint should allow users to like a specific post identified by its ID. (Protected Route)</td>
            <td>201</td>
        </tr>
        <tr>
            <td>POST</td>
            <td>/api/posts/:id/comment</td>
            <td>This endpoint should allow users to comment on a specific post identified by its ID.(Protected Route)</td>
            <td>201</td>
        </tr>
        <tr>
            <td>GET</td>
            <td>/api/posts/:id</td>
            <td>This endpoint should return the details of a specific post identified by its ID.</td>
            <td>200</td>
        </tr>
    </tbody>
</table>

<br>

## Problem Statement : 

<h3>
 <strong>
  <a href="https://near-ethernet-088.notion.site/Social-Media-App-524dc25d74004b43ad9573d55ca8a20f" >Notion File</a>
 </strong>
</h3>