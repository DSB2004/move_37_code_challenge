import { ForgetDTO } from "../../dto/auth.dto";
import z from "zod";
import { db } from "../../lib/db";
import { PasswordChangeEmail, TokenType } from "../../types/auth";
import { createJWT } from "../../utils/jwt.util";
import { sendMail } from "../../worker/service/email.service";
import { DEVELOPMENT } from "../../config";
export const forget = async (data: z.infer<typeof ForgetDTO>) => {
  const { email, redirectURL } = data;

  try {
    const user = await db.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      console.warn(`[FORGET PASSWORD] User ${email} not found`);
      return {
        status: 404,
        message: `Failed! No Account found with email ${email}`,
      };
    }

    const token = await createJWT({
      payload: { email: user.email, action: TokenType.PASSWORD },
      expireIn: "5m",
    });

    const url = redirectURL + "?auth_token=" + token;

    await sendMail(PasswordChangeEmail({ url, email }));
    return {
      status: 200,
      message: "Verification email has been sent",
      url:DEVELOPMENT?url:undefined
    };
  } catch (err) {
    console.error(`[FORGET PASSWORD] Error happened ${err}`);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
};
