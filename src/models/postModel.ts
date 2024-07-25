import { Model, DataTypes, Association } from "sequelize";
import sequelize from "../config/database-connection";
import User from "./userModel";
import Comment from "./commentModel";
import Category from "./categoryModel";
class Post extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public userId!: number;

  // Associations
  public readonly user?: User;
  public readonly categories?: Category[];
  public readonly comments?: Comment[];

  public static associations: {
    user: Association<Post, User>;
    categories: Association<Post, Category>;
    comments: Association<Post, Comment>;
  };
}
Post.init(
  {
    id: {
      type: DataTypes.STRING,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Post",
    tableName: "posts",
  }
);

export default Post;
