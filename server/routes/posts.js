import express from "express";
import { getPost, getPosts, getPostsBySearch, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);//patch is used to update posts
router.delete('/:id', auth, deletePost); // delete a post
router.patch('/:id/likePost', auth, likePost);
export default router;