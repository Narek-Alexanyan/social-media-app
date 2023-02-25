import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { 
    getFeedPosts, getUserPosts, likePost, addComment 
} from "../controllers/posts.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/comment", verifyToken, addComment);

export default router;