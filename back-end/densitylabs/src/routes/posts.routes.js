/* Url Routes */
import { Router } from 'express';
// Controllers
import { getPosts, createNewPost, updatePost, deletePost } from '../controllers/posts.controllers.js';


const router = Router();

// Gets posts
router.get('/posts', getPosts);

// Creates a new post
router.post('/posts', createNewPost);

// Updates an existing post
router.put('/post/:id', updatePost);

// Deletes a post
router.delete('/post/:id', deletePost);


export default router;
