import { db } from "../../lib/db";
import { publishUpdate } from "../../utils/vote.util";
export const del = async ({ id }: { id: string }) => {
  try {
    const poll = await db.polls.findUnique({
      where: {
        id,
      },
    });

    if (!poll) {
      console.warn(`[DELETE POLL] Poll not found ${id}`);
      return { status: 404, message: "Poll not found" };
    }
    console.info(`[DELETE POLL] Poll found ${poll.id}`);
    await db.$transaction(async (prisma) => {
      await prisma.replies.deleteMany({
        where: {
          pollId: id,
        },
      });
      await prisma.pollOptions.deleteMany({
        where: {
          pollId: id,
        },
      });
      await prisma.polls.delete({
        where: {
          id,
        },
      });
    });
    await publishUpdate({ id });
    return { status: 200, message: `Poll deleted ${poll.id}` };
  } catch (err) {
    console.warn(`[DELETE POLL] Error happened ${err}`);

    return { status: 500, message: `Internal Server Error` };
  }
};
