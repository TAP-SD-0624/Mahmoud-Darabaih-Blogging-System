import express, { Application } from "express";
import { userRouter } from "./routes/userRoutes";
import { postRouter } from "./routes/postsRoutes";
import { categoriesRouter } from "./routes/categoriesRoutes";

const app: Application = express();

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/categories", categoriesRouter);

export default app;
