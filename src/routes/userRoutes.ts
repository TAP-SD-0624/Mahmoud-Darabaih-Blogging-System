import express, { Router } from "express";
import userControllers from "../controllers/userController";

export const userRouter: Router = express.Router();

// get all users rout
userRouter.get("/", userControllers.showAllUsers);
// get specific user by its ID
userRouter.get("/:userID", userControllers.showUserByID);
// create new user
userRouter.post("/", userControllers.createNewUser);
// update user data
userRouter.put("/:userID", userControllers.updateUser);
// delete user
userRouter.delete("/:userID", userControllers.deleteUser);
