import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");

// Augment the Request type to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (token) {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
      (err: Error | null, decoded: any | undefined) => {
        if (err) return res.status(403).json({ message: "Forbidden" });
        if (decoded /*&& decoded.user*/) {
          req.params.name = decoded.name;
          next();
        } else {
          res.status(403).json({ message: "Invalid token payload" });
        }
      }
    );
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
