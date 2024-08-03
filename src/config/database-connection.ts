import { Dialect, Sequelize } from "sequelize";
import { dbConfig } from "./db-config";

const sequelizeObj = new Sequelize(
  dbConfig.DATABASE,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.DIALECT as Dialect,
    define: {
      timestamps: true,
    },
  }
);

export default sequelizeObj;
