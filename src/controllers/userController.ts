import { Request, Response } from "express";
import { User, Post } from "../models";

// get all users
const showAllUsers = async (req: Request, res: Response) => {
  await User.findAll({
    attributes: ["id", "userName", "email"],
  })
    .then((users) => {
      console.log("all  users displayed correctly");
      res.json(users);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ message: "Error fetching users", error });
    });
};

// get specific user by its ID
const showUserByID = (req: Request, res: Response): void => {
  res.status(200).send("showUserByID");
};

// create new user
const createNewUser = async (req: Request, res: Response) => {
  const { userName, email } = req.body;
  // Basic validation
  if (!userName || !email) {
    res.status(400).json({ message: "Please provide username, and email" });
  }

  await User.create({
    userName,
    email,
  })
    .then((newUser) => {
      console.log("User created successfully");
      res.status(201).json({
        message: "User created successfully",
        user: {
          id: newUser.id,
          userName: newUser.userName,
          email: newUser.email,
        },
      });
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ message: "Error creating user", error });
    });
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
