import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/constants";
import { ToastRender } from "./toast";

export const isValidToken = (token?: string): boolean => {
  if (!JWT_SECRET) return false;
  try {
    jwt.verify(token as string, JWT_SECRET);
    return true;
  } catch (error: any) {
    ToastRender(error, true);
    return false;
  }
};
