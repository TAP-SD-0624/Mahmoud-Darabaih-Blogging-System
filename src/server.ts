import sequelizeObj from "./config/database-connection";
import app from "./app";

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    // test connection
    await sequelizeObj
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch((err) => {
        console.error("connection failed err: ", err);
      });
    // Sync tables with the database
    await sequelizeObj
      .sync() //{ force: true }
      .then(() => {
        console.log("All models were synchronized successfully.");
        app.listen(PORT, () => {
          console.log(`Server is running on port https://localhost:${PORT}`);
        });
      })
      .catch((err) => {
        console.error("Sync failed err: ", err.message);
      });
  } catch (error) {
    console.error(
      "an error occurred in the sequelize connection to the DB",
      error
    );
  }
})();
