import { Request, Response } from "express";

const showAllUsers = (req: Request, res: Response): void => {
  console.log("this is all users page");
  res.status(200).send("changes");
};

export default {
  showAllUsers,
};
