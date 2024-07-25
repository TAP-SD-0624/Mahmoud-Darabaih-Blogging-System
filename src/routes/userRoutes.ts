import express, { Router } from "express";
import userControllers from "../controllers/userController";
export const userRouter: Router = express.Router();

// get all users rout
userRouter.get("/api/users", userControllers.showAllUsers);
// get specific user by its ID
userRouter.get("/api/users/:userID", userControllers.showUserByID);
// create new user
userRouter.post("/api/users", userControllers.createNewUser);
// update user data
userRouter.put("/api/users/:userID", userControllers.updateUser);
// delete user
userRouter.delete("/api/users:/userID", userControllers.deleteUser);
