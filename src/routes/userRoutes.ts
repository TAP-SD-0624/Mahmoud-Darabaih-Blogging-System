import express, { Router, Request, Response } from "express";
import userControllers from "../controllers/userController";
export const userRouter: Router = express.Router();

// get all users rout
userRouter.get("/api/users", userControllers.showAllUsers);
// get specific user by its ID
userRouter.get("/api/users/:userID", (req: Request, res: Response) => {});
// create new user
userRouter.post("/api/users", (req: Request, res: Response) => {});
// update user data
userRouter.put("/api/users/:userID", (req: Request, res: Response) => {});
// delete user
userRouter.delete("/api/users:/userID", (req: Request, res: Response) => {});
