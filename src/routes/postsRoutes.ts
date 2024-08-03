import express, { Router } from "express";
import postControllers from "../controllers/postController";
import { authenticate } from "../middlewares/auth";
export const postRouter: Router = express.Router();

// Get all posts with associated users, categories, and comments
postRouter.get("/", postControllers.showAllPosts);

// Create new post
postRouter.post("/", authenticate, postControllers.createNewPost);

// Get post by ID with associated users, categories, and comments
postRouter.get("/:postID", postControllers.showPostByID);

// Update post by ID
postRouter.put("/:postID", postControllers.updatePost);

// Delete post by ID
postRouter.delete("/:postID", postControllers.deletePost);

// Get categories for a specific post
postRouter.get("/:postID/categories", postControllers.showCategoryForPost);

// Create a new category for a post
postRouter.post(
  "/:postID/categories",
  postControllers.createNewCategoryForPost
);

// Get comments for a specific post
postRouter.get("/:postID/comments", postControllers.showCommentsForPost);

// Create a new comment for a post
postRouter.post("/:postID/comments", postControllers.createNewCommentForPost);
