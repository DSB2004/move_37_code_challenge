import { Request } from "express";

export enum TokenType {
  ACCESS = "access",
  REFRESH = "refresh",
  VERIFICATION = "verification",
  PASSWORD = "password",
}

export interface DecodedToken {
  email: string;
  id: string;
  action: TokenType;
}

export interface UserRequest extends Request {
  user: DecodedToken;
}
