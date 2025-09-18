import { db } from "../../lib/db";
import { Poll } from "../../types/poll";
import { sendMail } from "../../worker/service/email.service";
import { ShareDTO } from "../../dto/poll.dto";
import { DecodedToken } from "../../types/auth";
import { PollShareEmail } from "../../types/poll";
import z from "zod";
export const share = async ({
  id,
  user,
  data,
}: {
  id: string;
  user: DecodedToken;
  data: z.infer<typeof ShareDTO>;
}) => {
  try {
    const { list, redirectURL } = data;
    const { email } = user;

    const details = await db.users.findUnique({
      where: {
        email,
      },
      select: {
        username: true,
        id: true,
        email: true,
        createdAt: true,
      },
    });

    if (!details) {
      console.warn(`[SHARE] No account found ${email}`);
      return {
        status: 404,
        message: "No account found",
      };
    }

    const poll = await db.polls.findUnique({
      where: {
        id,
      },
    });

    if (!poll) {
      console.warn(`[SHARE] Poll not found ${id}`);
      return { status: 404, message: "Poll not found" };
    }

    const users = await db.users.findMany({
      where: {
        id: {
          in: list.map((ele) => ele.userId),
        },
      },
    });

    const url = redirectURL + "/" + poll.id;

    for (let u of users) {
      await sendMail(
        PollShareEmail({
          url,
          senderName: details.username || "This user",
          email: u.email,
          pollTitle: poll.question,
        })
      );
    }

    return { status: 200, message: `Share link sent` };
  } catch (err) {
    console.warn(`[SHARE] Error happened ${err}`);

    return { status: 500, message: `Internal Server Error` };
  }
};
