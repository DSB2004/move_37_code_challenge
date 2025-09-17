import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import { verifyJWT, createJWT } from "../utils/jwt.util";
import { DecodedToken, TokenType } from "../types/auth";
import { UserRequest } from "../types/auth";
export const jwt = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const headers = req.headers;

  const accessToken = req.get("access-token");
  const refreshToken = req.get("refresh-token");

  if (!accessToken || !refreshToken) {
    return res.status(403).json({
      message: "Access or refresh token missing in headers",
    });
  }

  const isAccessValid = await verifyJWT<DecodedToken>(accessToken);

  if (isAccessValid) {
    const { action } = isAccessValid;
    if (action !== TokenType.ACCESS) {
      return res.status(403).json({
        message: "Invalid access token sent",
      });
    }

    res.setHeader("access-token", accessToken);
    res.setHeader("refresh-token", refreshToken);
    return next();
  }

  const isRefreshValid = await verifyJWT<DecodedToken>(refreshToken);
  if (!isRefreshValid) {
    return res.status(401).json({
      message: "Please login again",
    });
  }

  const { email, action, id } = isRefreshValid;

  if (action !== TokenType.REFRESH) {
    return res.status(403).json({
      message: "Invalid refresh token sent",
    });
  }

  const _accessToken = await createJWT({
    payload: { email: email, action: TokenType.ACCESS, id: id },
    expireIn: "15m",
  });

  const _refreshToken = await createJWT({
    payload: { email: email, action: TokenType.REFRESH, id: id },
    expireIn: "7d",
  });

  res.setHeader("access-token", _accessToken);
  res.setHeader("refresh-token", _refreshToken);

  req.user = { id, email, action };

  return next();
};
