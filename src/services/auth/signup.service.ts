
import { createJWT } from "../../utils/jwt.util";
import { TokenType } from "../../types/auth";
import { db } from "../../lib/db";
import { SignupDTO } from "../../dto/auth.dto";
import { sendMail } from "../../worker/service/email.service";
import { AccountVerificationEmail } from "../../types/auth";
import { DEVELOPMENT } from "../../config";
import z from "zod";
import { hashPassword } from "../../utils/hash.util";

export const signUp = async (data: z.infer<typeof SignupDTO>) => {
  const { email, redirectURL, password } = data;

  try {
    const user = await db.users.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      console.warn(`[SIGNUP] Existing account ${email}`);
      return {
        status: 400,
        message: `Accopunt for mail ${email} already exist`,
      };
    }

    const hash = await hashPassword(password);

    await db.users.create({
      data: {
        email,
        passwordHash: hash,
      },
    });

    const token = await createJWT({
      payload: { email: email, action: TokenType.VERIFICATION },
      expireIn: "5m",
    });

    const url = redirectURL + "?auth_token=" + token;
    await sendMail(AccountVerificationEmail({ email, url }));
    return {
      status: 200,
      message: `Account created! Mail sent for ${email}`,
      url: DEVELOPMENT ? url : undefined,
    };
  } catch (err) {
    console.error(`[SIGNUP] Error happened ${err}`);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
};
