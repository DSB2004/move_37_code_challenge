"use server";

import { createJWT } from "../../utils/jwt.util";
import { TokenType } from "../../types/auth";
import { db } from "../../lib/db";
import { LoginDTO } from "../../dto/user.dto";
import z from "zod";
export const logIn = async (data: z.infer<typeof LoginDTO>) => {
  const { email, redirectURL } = data;

  try {
    const user = await db.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      console.warn(`[LOGIN] New account ${email}`);
      await db.users.create({
        data: {
          email,
        },
      });
    } else {
      console.warn(`[LOGIN] Existing account ${email}`);
    }

    const token = await createJWT({
      payload: { email: email, action: TokenType.VERIFICATION },
      expireIn: "5m",
    });

    const url = redirectURL + "?auth_token=" + token;

    return {
      status: 200,
      message: `Sent mail for ${email}`,
      url,
    };
  } catch (err) {
    console.error(`[LOGIN] Error happened ${err}`);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
};
