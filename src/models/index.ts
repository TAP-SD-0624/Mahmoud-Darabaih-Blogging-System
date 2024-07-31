import User from "./userModel";
import Post from "./postModel";
import Category from "./categoryModel";
import Comment from "./commentModel";
import PostCategories from "./PostCategories";

// User - Post relationship (One-to-Many)
User.hasMany(Post, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "user posts",
});
Post.belongsTo(User, {
  targetKey: "id",
  foreignKey: "userId",
  as: "author",
});

// Category - Post relationship (Many-to-Many)
Post.belongsToMany(Category, {
  through: PostCategories,
});
Category.belongsToMany(Post, {
  through: PostCategories,
});

// User - Comment relationship (One-to-Many)
User.hasMany(Comment, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "user's comments",
});
Comment.belongsTo(User, {
  targetKey: "id",
  foreignKey: "userId",
  as: "comment author",
});

// Post - Comment relationship (One-to-Many)
Post.hasMany(Comment, {
  sourceKey: "id",
  foreignKey: "postId",
  as: "comments",
});
Comment.belongsTo(Post, {
  targetKey: "id",
  foreignKey: "postId",
  as: "post",
});

export { User, Post, Category, Comment, PostCategories };
