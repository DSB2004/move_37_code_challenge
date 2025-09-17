"use server";

import { createJWT, verifyJWT } from "../../utils/jwt.util";

import { TokenType } from "../../types/auth";
import { db } from "../../lib/db";
import { VerifyDTO } from "../../dto/user.dto";
import z from "zod";
export const verify = async (data: z.infer<typeof VerifyDTO>) => {
  const { authToken } = data;

  try {
    const res = await verifyJWT<{ email: string; action: TokenType }>(
      authToken
    );

    if (!res) {
      return {
        status: 403,
        message: "Session expired or token is not valid",
      };
    }

    const { email, action } = res;

    if (action !== TokenType.VERIFICATION) {
      return {
        status: 403,
        message: "This token is not a verification token",
      };
    }

    const user = await db.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      console.warn(`[VERIFY] No account found ${email}`);
      return {
        status: 404,
        message: "No account found",
      };
    }

    const accessToken = await createJWT({
      payload: { email: email, action: TokenType.ACCESS, id: user.id },
      expireIn: "15m",
    });

    const refreshToken = await createJWT({
      payload: { email: email, action: TokenType.REFRESH, id: user.id },
      expireIn: "7d",
    });

    return {
      accessToken,
      refreshToken,
      status: 200,
      message: `Access token sent in header ${email}`,
    };
  } catch (err) {
    console.error(`[VERIFY] Error happened ${err}`);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
};
