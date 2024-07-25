import { Request, Response } from "express";

// get all users controller
const showAllUsers = (req: Request, res: Response): void => {
  console.log("this is all users page");
  res.status(200).send("changes");
};

// get specific user by its ID
const showUserByID = (req: Request, res: Response): void => {
  res.status(200).send("showUserByID");
};

// create new user
const createNewUser = (req: Request, res: Response): void => {
  res.status(200).send("createNewUser");
};

// update user data
const updateUser = (req: Request, res: Response): void => {
  res.status(200).send("updateUser");
};

// delete user
const deleteUser = (req: Request, res: Response): void => {
  res.status(200).send("deleteUser");
};

export default {
  showAllUsers,
  showUserByID,
  createNewUser,
  updateUser,
  deleteUser,
};
