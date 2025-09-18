import { Response, NextFunction, Request } from "express";
import { verifyJWT, createJWT } from "../utils/jwt.util";
import { DecodedToken, TokenType } from "../types/auth";

export const jwt = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers["access-token"];
  const refreshToken = req.headers["refresh-token"];

  if (
    !accessToken ||
    !refreshToken ||
    typeof accessToken != "string" ||
    typeof refreshToken != "string"
  ) {
    if (req.originalUrl.includes("/vote") && req.method === "GET") {
      return next();
    }
    return res.status(403).json({
      message: "Access or refresh token missing in headers",
    });
  }

  const isAccessValid = await verifyJWT<DecodedToken>(accessToken);

  if (isAccessValid) {
    const { action, id, email } = isAccessValid;
    if (action !== TokenType.ACCESS) {
      return res.status(403).json({
        message: "Invalid access token sent",
      });
    }

    res.setHeader("access-token", accessToken);
    res.setHeader("refresh-token", refreshToken);
    res.locals.user = { id, email, action };
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

  res.locals.user = { id, email, action };

  return next();
};
