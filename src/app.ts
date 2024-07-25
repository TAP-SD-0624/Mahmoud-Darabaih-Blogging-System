import express, { Application } from "express";
import { userRouter } from "./routes/userRoutes";
import { postRouter } from "./routes/postsRoutes";

const app: Application = express();

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

export default app;
