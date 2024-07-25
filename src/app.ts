import express, { Application } from "express";
import { userRouter } from "./routes/userRoutes";
import { postRouter } from "./routes/postsRoutes";

const app: Application = express();
//user routes
app.use(userRouter);
app.use(postRouter);

app.listen(3000, () => {
  console.log("the app is running ion port 3000");
});
