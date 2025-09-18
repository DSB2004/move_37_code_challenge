import { DecodedToken } from "../../types/auth";
import { db } from "../../lib/db";

export const retrieve = async ({ user }: { user: DecodedToken }) => {
  const { email } = user;

  try {
    const details = await db.users.findUnique({
      where: {
        email,
      },
      select: {
        username: true,
        id: true,
        bio: true,
        email: true,
        createdAt: true,
      },
    });

    if (!details) {
      console.warn(`[RETRIEVE] No account found ${email}`);
      return {
        status: 404,
        message: "No account found",
      };
    }

    return {
      status: 200,
      message: `Account found ${email}`,
      user: details,
    };
  } catch (err) {
    console.error(`[RETRIEVE] Error happened ${err}`);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
};
