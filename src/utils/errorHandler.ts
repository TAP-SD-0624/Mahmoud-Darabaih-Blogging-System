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

// You can add more error handling utilities here if needed
export const notFoundError = (res: Response, message: string) => {
  return res.status(404).json({ message });
};

export const badRequestError = (res: Response, message: string) => {
  return res.status(400).json({ message });
};
export const invalidCredentialsError = (res: Response, message: string) => {
  return res.status(401).json({ message });
};
