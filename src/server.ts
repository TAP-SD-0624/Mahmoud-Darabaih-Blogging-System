import sequelizeObj from "./config/database-connection";
import app from "./app";

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelizeObj
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch((err) => {
        console.error("connection failed err: ", err);
      });
    await sequelizeObj
      .sync()
      .then(() => {
        console.log("All models were synchronized successfully.");
        app.listen(PORT, () => {
          console.log(`Server is running on port https://localhost:${PORT}`);
        });
      })
      .catch((err) => {
        console.error("Sync failed err: ", err);
      });
  } catch (error) {
    console.error(
      "an error occurred in the sequelize connection to the DB",
      error
    );
  }
})();
