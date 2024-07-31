import { Request, Response } from "express";
import { User, Post, Category, Comment, PostCategories } from "../models";
import {
  handleError,
  notFoundError,
  badRequestError,
} from "../utils/errorHandler";

const showAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, as: "author", attributes: ["userName"] },
        { model: Category, as: "Categories" },
        {
          model: Comment,
          as: "comments",
          include: [
            {
              model: User,
              as: "comment author",
              attributes: ["id", "userName"],
            },
          ],
        },
      ],
    });
    console.log("All posts displayed correctly");
    return res.json(posts);
  } catch (error) {
    return handleError(res, error, "Error fetching all posts");
  }
};

const createNewPost = async (req: Request, res: Response) => {
  try {
    const { title, content, userId } = req.body;
    if (!title || !content || !userId) {
      return badRequestError(res, "Please provide title, content, and userId");
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return notFoundError(res, `User with ID ${userId} not found`);
    }

    const newPost = await Post.create({ title, content, userId });
    console.log("New post created successfully");
    return res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    return handleError(res, error, "Error creating new post");
  }
};

const showPostByID = async (req: Request, res: Response) => {
  try {
    const postId = req.params.postID;
    const post = await Post.findByPk(postId, {
      include: [
        { model: User, as: "author", attributes: ["userName"] },
        { model: Category, as: "Categories" },
        {
          model: Comment,
          as: "comments",
          include: [
            {
              model: User,
              as: "comment author",
              attributes: ["id", "userName"],
            },
          ],
        },
      ],
    });
    if (!post) {
      return notFoundError(res, `Post with ID ${postId} not found`);
    }
    console.log(`Post with ID ${postId} displayed correctly`);
    return res.json(post);
  } catch (error) {
    return handleError(res, error, "Error fetching post by ID");
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.postID;
    const { title, content } = req.body;
    if (!title && !content) {
      return badRequestError(res, "Please provide title or content to update");
    }
    const [updated] = await Post.update(
      { title, content },
      { where: { id: postId } }
    );
    if (updated) {
      const updatedPost = await Post.findByPk(postId);
      console.log(`Post with ID ${postId} updated successfully`);
      return res.json({
        message: "Post updated successfully",
        post: updatedPost,
      });
    }
    return notFoundError(res, `Post with ID ${postId} not found`);
  } catch (error) {
    return handleError(res, error, "Error updating post");
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.postID;
    const deleted = await Post.destroy({ where: { id: postId } });
    if (deleted) {
      console.log(`Post with ID ${postId} deleted successfully`);
      return res.json({ message: "Post deleted successfully" });
    }
    return notFoundError(res, `Post with ID ${postId} not found`);
  } catch (error) {
    return handleError(res, error, "Error deleting post");
  }
};

const showCategoryForPost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.postID;
    const post = await Post.findByPk(postId, {
      include: [
        { model: User, as: "author", attributes: ["userName"] },
        {
          model: Category,
          as: "Categories",
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });
    if (!post) {
      return notFoundError(res, `Post with ID ${postId} not found`);
    }
    console.log(`Categories for post with ID ${postId} displayed correctly`);
    return res.send(post);
  } catch (error) {
    return handleError(res, error, "Error fetching categories for post");
  }
};
const createNewCategoryForPost = async (req: Request, res: Response) => {
  const postID = req.params.postID;
  const { categoryID } = req.body;
  try {
    const categoryExists = await PostCategories.findOne({
      where: {
        PostId: postID,
        CategoryId: categoryID,
      },
    });
    if (categoryExists) {
      return res
        .status(201)
        .json({ status: "the category already exist for this post" });
    }
    await PostCategories.create({ PostId: postID, CategoryId: categoryID });
    res.status(201).json({ status: "success" });
  } catch (error) {
    return handleError(res, error, "Error adding category for a post");
  }
};
const showCommentsForPost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.postID;
    const post = await Post.findByPk(postId, {
      include: [
        {
          model: Comment,
          as: "comments",
          include: [
            {
              model: User,
              as: "comment author",
              attributes: ["id", "userName"],
            },
          ],
        },
      ],
    });
    if (!post) {
      return notFoundError(res, `Post with ID ${postId} not found`);
    }
    console.log(`Comments for post with ID ${postId} displayed correctly`);
    return res.json(post);
  } catch (error) {
    return handleError(res, error, "Error fetching comments for post");
  }
};

const createNewCommentForPost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.postID;
    const { commentContent, userId } = req.body;

    if (!commentContent || !userId) {
      return badRequestError(res, "Please provide comment content and userId");
    }

    const post = await Post.findByPk(postId);
    if (!post) {
      return notFoundError(res, `Post with ID ${postId} not found`);
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return notFoundError(res, `User with ID ${userId} not found`);
    }

    const newComment = await Comment.create({
      content: commentContent,
      userId,
      postId,
    });

    const commentWithAuthor = await Comment.findByPk(newComment.id, {
      include: [
        { model: User, as: "comment author", attributes: ["id", "userName"] },
      ],
    });

    console.log(`New comment added to post with ID ${postId}`);
    return res.status(201).json({
      message: "Comment added to post successfully",
      comment: commentWithAuthor,
    });
  } catch (error) {
    return handleError(res, error, "Error creating new comment for post");
  }
};
export default {
  showAllPosts,
  createNewPost,
  showPostByID,
  updatePost,
  deletePost,
  showCategoryForPost,
  createNewCategoryForPost,
  showCommentsForPost,
  createNewCommentForPost,
};
