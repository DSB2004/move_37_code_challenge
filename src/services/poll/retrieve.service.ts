import { db } from "../../lib/db";
import { Poll } from "../../types/poll";
export const retrieve = async ({ id }: { id: string }) => {
  try {
    const poll = await db.polls.findUnique({
      where: {
        id,
      },
    });

    if (!poll) {
      console.warn(`[GET POLL] Poll not found ${id}`);
      return { status: 404, message: "Poll not found" };
    }
    console.info(`[GET POLL] Poll found ${poll.id}`);

    const replies = await db.replies.findMany({
      where: {
        pollId: poll.id,
      },
      select: {
        option: {
          select: {
            id: true,
          },
        },
        user: {
          select: {
            username: true,
            id: true,
          },
        },
      },
    });
    const options = await db.pollOptions.findMany({
      where: {
        pollId: poll.id,
      },
      select: {
        id: true,
        option: true,
      },
    });

    const data: Poll = {
      ...poll,
      options,
      replies,
    };

    return { status: 200, message: `Poll found ${poll.id}`, poll: data };
  } catch (err) {
    console.warn(`[GET POLL] Error happened ${err}`);

    return { status: 500, message: `Internal Server Error` };
  }
};
