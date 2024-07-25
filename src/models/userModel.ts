import { Association, DataTypes, Model } from "sequelize";
import sequelize from "../config/database-connection";
import Post from "./postModel";
import Comment from "./commentModel";
class User extends Model {
  public id!: number;
  public userName!: string;
  public email!: string;

  // Associations
  public readonly posts?: Post[];
  public readonly comments?: Comment[];

  public static associations: {
    posts: Association<User, Post>;
    comments: Association<User, Comment>;
  };
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
  }
);

export default User;
