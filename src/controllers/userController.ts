import { Request, Response } from "express";
import { User } from "../models";
import {
  handleError,
  notFoundError,
  badRequestError,
  invalidCredentialsError,
} from "../utils/errorHandler";
import bcrypt from "bcrypt";
// get all users
const showAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "userName", "email"],
    });
    console.log("All users displayed correctly");
    return res.json(users);
  } catch (error) {
    return handleError(res, error, "Error fetching users");
  }
};

// get specific user by its ID
const showUserByID = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userID;
    const user = await User.findByPk(userId);

    if (!user) {
      return notFoundError(res, `User with ID ${userId} not found`);
    }

    console.log("User found: ", user);
    return res.status(200).json(user);
  } catch (error) {
    return handleError(res, error, "Error fetching user");
  }
};

// create new user
const createNewUser = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return badRequestError(res, "Please provide username and password");
    }
    const hashedPassword = await User.hashPassword(password);
    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword.toString(),
    });
    console.log("User created successfully");
    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        userName: newUser.userName,
        email: newUser.email,
        password: newUser.password,
      },
    });
  } catch (error) {
    return handleError(res, error, "Error creating user");
  }
};

// login
const login = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ where: { userName } });
    if (!user) {
      return notFoundError(res, `User with username: ${userName} not found`);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return invalidCredentialsError(res, "Invalid password");
    }
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    return handleError(res, error, "Error in the login process");
  }
};
// update user data
const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userID;
    const { userName, email } = req.body;

    if (!userName && !email) {
      return badRequestError(res, "Please provide data to update");
    }

    const [updated] = await User.update(
      { userName, email },
      { where: { id: userId } }
    );

    if (!updated) {
      return notFoundError(res, `User with ID ${userId} not found`);
    }

    const updatedUser = await User.findByPk(userId);

    if (!updatedUser) {
      return notFoundError(
        res,
        `User with ID ${userId} not found after updating it!!`
      );
    }

    return res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return handleError(res, error, "Error updating user");
  }
};

// delete user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userID;
    const deleted = await User.destroy({ where: { id: userId } });

    if (!deleted) {
      return notFoundError(res, `User with ID ${userId} not found`);
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return handleError(res, error, "Error deleting user");
  }
};

export default {
  showAllUsers,
  showUserByID,
  createNewUser,
  updateUser,
  deleteUser,
  login,
};
