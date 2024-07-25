import { Association, DataTypes, Model } from "sequelize";
import sequelize from "../config/database-connection";
import Post from "./postModel";
class Category extends Model {
  public id!: number;
  public name!: string;

  // Associations
  public readonly posts?: Post[];

  public static associations: {
    posts: Association<Category, Post>;
  };
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Category",
    tableName: "categories",
  }
);
export default Category;
