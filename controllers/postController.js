// Models location
const { postModel } = require("../models/postModel");


// This controller should return a list of all posts.
const allPostsController = async (req,res) => {
    try {
        const data = await postModel.find().populate('user');
        res.status(200).json(data);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            "Message":error.message
        });
    }
};


// This controller should allow the user to create a new post.
const createNewPostController = async (req,res) => {
    const payload = req.body;
    try {
        const data = await postModel(payload);
        await data.save();
        res.status(201).json("Post created successfully")
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            "Message":error.message
        });
    }
};


// This controller should allow users to update the text or image of a specific post identified by its ID.
const updateTextOrImagePostController = async (req,res) => {
    const id = req.params.id;
    const payload = req.body;
    try {
        const data = await postModel.findByIdAndUpdate(id,payload);
        res.status(204).json("updated successfully text and images")
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            "Message":error.message
        });
    }
};


// This controller should allow users to delete a specific post identified by its ID.
const deletePostController = async (req,res) => {
    const Id = req.params.id
    try {
        const data = await postModel.findByIdAndDelete(Id);
        res.status(202).json("Post deleted successfully");
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            "Message":error.message
        });
    }
};


// This controller should allow users to like a specific post identified by its ID.
const likePostController = async (req,res) => {
    const Id = req.params.id;
    const payload = req.body;
    try {
        const data = await postModel.findByIdAndUpdate({_id:Id},payload)
        res.status(201).json('Post updated successfully')
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            "Message":error.message
        });
    }
};


// This controller should allow users to comment on a specific post identified by its ID.
const commentOnPostController = async (req,res) => {
    const Id = req.params.id;
    const payload = req.body;
    try {
        const data = await postModel.findOne({_id:Id})
        data.comments.push(payload);

        const updatedComment = await postModel.findByIdAndUpdate({_id:Id, data});
        await updatedComment.save();
        res.status(201).json('Comment updated successfully')
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            "Message":error.message
        });
    }
};


// This controller should return the details of a specific post identified by its ID.
const detailsOfPostController = async (req,res) => {
    const Id = req.params.id;
    try {
        const data = await postModel.findById(Id).populate('User');
        res.status(200).json(data);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            "Message":error.message
        });
    }
};


module.exports = {
                    allPostsController,
                    createNewPostController,
                    updateTextOrImagePostController,
                    deletePostController,
                    likePostController,
                    commentOnPostController,
                    detailsOfPostController
                 };