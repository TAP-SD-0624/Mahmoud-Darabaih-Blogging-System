import sequelize from "../config/database-connection";
import { Association, DataTypes, Model } from "sequelize";

class PostCategories extends Model {}

PostCategories.init(
  {},
  {
    sequelize,
    modelName: "PostCategories",
    tableName: "PostCategories",
    freezeTableName: true,
  }
);

export default PostCategories;
