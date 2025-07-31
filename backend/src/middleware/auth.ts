import jwt from "jsonwebtoken";
import { Request } from "express";
import dotenv from "dotenv";
dotenv.config();

interface DecodedUser {
  id: string;
  name: string;
  email: string;
}

export const getUserFromToken = (req: Request): DecodedUser | null => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];
  if (!token) return null;
  console.log(token);

  try {
    // console.log("Hello");

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedUser;
        // console.log(decoded);

    return decoded;
  } catch (err) {
        console.log(err)

    return null;
  }
};
