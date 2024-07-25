import express, { Router } from "express";
import postControllers from "../controllers/postController";
export const postRouter: Router = express.Router();

// Get all posts with associated users, categories, and comments
postRouter.get("/api/posts", postControllers.showAllPosts);
// Get post by ID with associated users, categories, and comments
postRouter.get("/api/posts/:postID", postControllers.showPostByID);
// Get categories for a specific post
postRouter.get(
  "/api/posts/:postID/:categories",
  postControllers.showCategoryForPost
);
// Get comments for a specific post
postRouter.get(
  "/api/posts/:postID/:comments",
  postControllers.showCommentsForPost
);
// create new post
postRouter.post("/api/posts", postControllers.createNewPost);
// create a new category for a post
postRouter.post(
  "/api/posts/:postId/categories",
  postControllers.createNewCategoryForPost
);
// create a new comment for a post
postRouter.post(
  "/api/posts/:postId/comments",
  postControllers.createNewCommentForPost
);
// update post by ID
postRouter.put("/api/posts/:postID", postControllers.updatePost);
// delete post by ID
postRouter.delete("/api/posts/:postID", postControllers.deletePost);
