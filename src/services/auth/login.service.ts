
import { createJWT } from "../../utils/jwt.util";
import { TokenType } from "../../types/auth";
import { db } from "../../lib/db";
import { LoginDTO } from "../../dto/auth.dto";
import z from "zod";
import { comparePassword } from "../../utils/hash.util";
import { sendMail } from "../../worker/service/email.service";
import { AccountVerificationEmail } from "../../types/auth";
import { DEVELOPMENT } from "../../config";
export const logIn = async (data: z.infer<typeof LoginDTO>) => {
  const { email, redirectURL, password } = data;

  try {
    const user = await db.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      console.warn(`[LOGIN] Account ${email} not found`);
      return {
        status: 404,
        message: `No account found for mail ${email}`,
      };
    }

    const check = await comparePassword(password, user.passwordHash);
    if (!check) {
      console.warn(`[LOGIN] Incorrect credentials for ${email}`);
      return {
        status: 400,
        message: `Incorrect credentials for ${email}`,
      };
    }
    if (!user.isVerified) {
      const token = await createJWT({
        payload: { email: email, action: TokenType.VERIFICATION },
        expireIn: "5m",
      });

      const url = redirectURL + "?auth_token=" + token;
      await sendMail(AccountVerificationEmail({ email, url }));
      return {
        status: 403,
        message: `Verification email has been sent ${email}`,
        url: DEVELOPMENT ? url : undefined,
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
      message: `Login successful`,
    };
  } catch (err) {
    console.error(`[LOGIN] Error happened ${err}`);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
};
