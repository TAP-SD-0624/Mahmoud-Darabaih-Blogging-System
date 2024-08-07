import { Association, DataTypes, Model } from "sequelize";
import sequelize from "../config/database-connection";
import Post from "./postModel";
import bcrypt from "bcrypt";
import Comment from "./commentModel";
class User extends Model {
  public id!: number;
  public userName!: string;
  public email!: string;
  public password!: string;

  // Associations
  public readonly posts?: Post[];
  public readonly comments?: Comment[];

  public static associations: {
    posts: Association<User, Post>;
    comments: Association<User, Comment>;
  };
  static async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async validatePassword(password: string) {
    return bcrypt.compare(password, this.password);
  }
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
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
  }
);

export default User;
