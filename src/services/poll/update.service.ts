import { UpdateDTO } from "../../dto/poll.dto";
import z from "zod";
import { DecodedToken } from "../../types/auth";
import { db } from "../../lib/db";
import { publishUpdate } from "../../utils/vote.util";
export const update = async ({
  data,
  id,
  user,
}: {
  data: z.infer<typeof UpdateDTO>;
  user: DecodedToken;
  id: string;
}) => {
  const { question, description, isPublished } = data;
  const poll = await db.polls.findUnique({
    where: {
      id,
      ownerId: user.id,
    },
  });

  if (!poll) {
    console.warn(`[UPDATE POLL] Poll not found ${id}`);
    return { status: 404, message: "Poll not found" };
  }
  try {
    const poll = await db.$transaction(async (prisma) => {
      const poll = await prisma.polls.update({
        where: {
          id,
        },
        data: {
          question,
          description,
          isPublished,
        },
      });
      return poll;
    });

    console.info(`[UPDATE POLL] Poll updated ${poll.id}`);
    await publishUpdate({ id });
    return { status: 200, message: `Poll updated ${poll.id}` };
  } catch (err) {
    console.warn(`[UPDATE POLL] Error happened ${err}`);

    return { status: 500, message: `Internal Server Error` };
  }
};
