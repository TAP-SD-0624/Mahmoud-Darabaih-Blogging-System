import User from "./userModel";
import Post from "./postModel";
import Category from "./categoryModel";
import Comment from "./commentModel";

// User - Post relationship (One-to-Many)
User.hasMany(Post, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "posts",
});
Post.belongsTo(User, {
  targetKey: "id",
  foreignKey: "userId",
  as: "user",
});

// Category - Post relationship (Many-to-Many)
Category.belongsToMany(Post, {
  through: "PostCategories",
  as: "posts",
});
Post.belongsToMany(Category, {
  through: "PostCategories",
  as: "categories",
});

// User - Comment relationship (One-to-Many)
User.hasMany(Comment, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "comments",
});
Comment.belongsTo(User, {
  targetKey: "id",
  foreignKey: "userId",
  as: "user",
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

export { User, Post, Category, Comment };