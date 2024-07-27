import { Response } from "express";

export const handleError = (
  res: Response,
  error: any,
  message: string,
  status: number = 500
) => {
  console.error(message, error);
  return res.status(status).json({ message, error: error.message });
};
