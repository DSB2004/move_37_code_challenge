import { ResetDTO } from "../../dto/auth.dto";
import z from "zod";
import { db } from "../../lib/db";
import { TokenType } from "../../types/auth";
import { verifyJWT } from "../../utils/jwt.util";
import { hashPassword } from "../../utils/hash.util";
export const reset = async (data: z.infer<typeof ResetDTO>) => {
  const { authToken, password } = data;

  try {
    const res = await verifyJWT<{ email: string; action: TokenType }>(
      authToken
    );

    if (res == null) {
      return {
        status: 403,
        message: "Failed! Unable to change password, Session Expired",
      };
    }
    const { email, action } = res;

    if (action !== TokenType.PASSWORD) {
      return {
        status: 403,
        message: "Failed! Wrong verification token provided",
      };
    }

    const user = await db.users.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      console.warn(`[RESET PASSWORD] User ${email} not found`);
      return {
        status: 404,
        message: `Failed! No Account found with email ${email}`,
      };
    }

    const hashPw = await hashPassword(password);

    await db.users.update({
      where: {
        email,
      },
      data: {
        passwordHash: hashPw,
      },
    });

    return {
      status: 200,
      message: "Password has been changed successfully",
    };
  } catch (err) {
    console.error(`[RES PASSWORD] Error happened ${err}`);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
};
