import  express  from "express";
import mongoose from "mongoose";

import PostMessage from "../models/postMessage.js"

const router = express.Router();


export const getPosts = (req, res) => {
    try {
        const postMessages = PostMessage.find(); //all  posts are returned as an array of objects
        console.log(postMessages);
        res.status(200);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post)

    try {
        await newPost.save();

        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error })
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const { post } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')

    await PostMessage.findByIdAndDelete(id);
    res.json({ message: 'Post Deleted successfully' })
}

export const likePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')

   const post = await PostMessage.findById(id);
   const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true })

    res.json(updatedPost);

}

export default router;