import express  from "express";
import { getPosts, getPostsBySearch, createPost, getPost, updatePost, deletePost, likePost,  commentPost, getPostsByCreator} from "../controllers/posts.js";
import auth from "../middleware/auth.js"

const router = express.Router();

router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.get('/creator', getPostsByCreator);
router.post('/', auth, createPost);
router.get('/:id', getPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', commentPost);


export default router;
