import express, { Router, Request, Response } from "express";

const userRouter: Router = express.Router();

// get all users rout
userRouter.get("/api/users", (req: Request, res: Response) => {});
// get specific user by its ID
userRouter.get("/api/users/:userID", (req: Request, res: Response) => {});
// create new user
userRouter.post("/api/users", (req: Request, res: Response) => {});
// update user data
userRouter.put("/api/users/:userID", (req: Request, res: Response) => {});
// delete user
userRouter.delete("/api/users:/userID", (req: Request, res: Response) => {});

module.exports = userRouter;
