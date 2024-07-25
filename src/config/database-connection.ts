import { dbConfig } from "./db-config";
import sequelize, { Sequelize, Dialect, DataTypes } from "sequelize";

const sequelizeObj: Sequelize = new Sequelize(
  dbConfig.DATABASE,
  dbConfig.USER,
  dbConfig.PASSWORD,
  { host: dbConfig.HOST, dialect: dbConfig.DIALECT as Dialect }
);

export const bd = {
  sequelize: sequelizeObj,
  models: {
    User: require("../models/userModel")(sequelizeObj, DataTypes),
    Post: require("../models/postModel")(sequelizeObj, DataTypes),
  },
};
