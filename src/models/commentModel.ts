import { DataTypes, Model, Association } from "sequelize";
import sequelize from "../config/database-connection";
import Post from "./postModel";
import User from "./userModel";
class Comment extends Model {
  public id!: number;
  public content!: string;
  public userId!: number;
  public postId!: number;

  // Associations
  public readonly user?: User;
  public readonly post?: Post;

  public static associations: {
    user: Association<Comment, User>;
    post: Association<Comment, Post>;
  };
}
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Comment",
    tableName: "comments",
  }
);

export default Comment;
