import express from "express"
import {getFeedPosts,getUserPosts,likePost} from "../controllers/posts.js"
import { verifyJWT } from "../middleware/auth.js"

const router = express.Router();

// READ
router.get("/",verifyJWT,getFeedPosts);
router.get("/:userId/posts",verifyJWT,getUserPosts);

// UPDATE
router.patch("/:id/like",verifyJWT,likePost);



export default router;
