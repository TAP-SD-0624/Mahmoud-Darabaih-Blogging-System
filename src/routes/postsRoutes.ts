import express, { Router } from "express";
import postControllers from "../controllers/postController";
export const postRouter: Router = express.Router();

// Get all posts with associated users, categories, and comments
postRouter.get("/", postControllers.showAllPosts);
// Get post by ID with associated users, categories, and comments
postRouter.get("/:postID", postControllers.showPostByID);
// Get categories for a specific post
postRouter.get("/:postID/:categories", postControllers.showCategoryForPost);
// Get comments for a specific post
postRouter.get("/:postID/:comments", postControllers.showCommentsForPost);
// create new post
postRouter.post("", postControllers.createNewPost);
// create a new category for a post
postRouter.post(
  "/:postId/categories",
  postControllers.createNewCategoryForPost
);
// create a new comment for a post
postRouter.post("/:postId/comments", postControllers.createNewCommentForPost);
// update post by ID
postRouter.put("/:postID", postControllers.updatePost);
// delete post by ID
postRouter.delete("/:postID", postControllers.deletePost);
