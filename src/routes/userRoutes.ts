import express, { Router } from "express";
import userControllers from "../controllers/userController";
import authController from "../controllers/authController";

export const userRouter: Router = express.Router();

// get specific user by its ID
userRouter.get("/:userID", userControllers.showUserByID);
// get all users rout
userRouter.get("/", userControllers.showAllUsers);
// create new user
userRouter.post("/", userControllers.createNewUser);
// user login
userRouter.post("/login", authController.login);
// update user data
userRouter.put("/:userID", userControllers.updateUser);
// delete user
userRouter.delete("/:userID", userControllers.deleteUser);
