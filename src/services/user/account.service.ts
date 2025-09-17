"use server";

import { createJWT } from "../../utils/jwt.util";
import { DecodedToken, TokenType } from "../../types/auth";
import { db } from "../../lib/db";
import { AccountDTO } from "../../dto/user.dto";
import z from "zod";
export const account = async (
  data: z.infer<typeof AccountDTO>,
  user: DecodedToken
) => {
  const { email} = user;
  const { username, bio } = data;

  try {
    const details = await db.users.findUnique({
      where: {
        email,
      },
    });

    if (!details) {
      console.warn(`[ACCOUNT] No account found ${email}`);
      return {
        status: 404,
        message: "No account found",
      };
    }

    await db.users.update({
      where: {
        email,
      },
      data: {
        bio,
        username,
      },
    });

    return {
      status: 201,
      message: `Account created ${email}`,
    };
  } catch (err) {
    console.error(`[ACCOUNT] Error happened ${err}`);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
};
