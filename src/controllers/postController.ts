import { Request, Response } from "express";

// get all posts controller
const showAllPosts = (req: Request, res: Response): void => {
  res.status(200).send("show All Posts");
};

// get specific post by its ID
const showPostByID = (req: Request, res: Response): void => {
  res.status(200).send("show Post By ID");
};

// get categories for a specific post
const showCategoryForPost = (req: Request, res: Response): void => {
  res.status(200).send("show Category For Post");
};

// Get comments for a specific post
const showCommentsForPost = (req: Request, res: Response): void => {
  res.status(200).send("show Comments For Post");
};

// create new post
const createNewPost = (req: Request, res: Response): void => {
  res.status(200).send("create New Post");
};

// create a new category for a post
const createNewCategoryForPost = (req: Request, res: Response): void => {
  res.status(200).send("create New Category For Post");
};

// create a new comment for a post
const createNewCommentForPost = (req: Request, res: Response): void => {
  res.status(200).send("create New Comment For Post");
};

// update post by ID
const updatePost = (req: Request, res: Response): void => {
  res.status(200).send("update post");
};

// delete user
const deletePost = (req: Request, res: Response): void => {
  res.status(200).send("delete post");
};

export default {
  showAllPosts,
  showPostByID,
  showCategoryForPost,
  showCommentsForPost,
  createNewPost,
  createNewCategoryForPost,
  createNewCommentForPost,
  updatePost,
  deletePost,
};
