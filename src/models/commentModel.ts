import { DataTypes, Model, Association } from "sequelize";
import sequelize from "../config/database-connection";
import Post from "./postModel";
import User from "./userModel";
class Comment extends Model {
  public id!: number;
  public content!: string;
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
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
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
