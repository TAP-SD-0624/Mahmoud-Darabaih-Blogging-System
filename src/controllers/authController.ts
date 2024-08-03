const jwt = require("jsonwebtoken");
import { User } from "../models";
import { Request, Response } from "express";

import {
  handleError,
  notFoundError,
  badRequestError,
  invalidCredentialsError,
} from "../utils/errorHandler";

const login = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ where: { userName } });
    if (!user) {
      return notFoundError(res, `User with username: ${userName} not found`);
    }
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      return invalidCredentialsError(res, "Invalid password");
    }
    const accessToken = jwt.sign(
      { name: user.userName },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const refreshToken = jwt.sign(
      { name: user.userName },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    // store the refresh token in the DB

    res.cookie("JWT", refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res
      .status(200)
      .json({ message: "Login successful", accessToken: accessToken, user });
  } catch (error) {
    return handleError(res, error, "Error in the login process");
  }
};

export default { login };
