import { db } from "../lib/db";
import { publish } from "../socket";
import { SocketEvent } from "../types/poll";
export const publishVote = async ({ pollId }: { pollId: string }) => {
  try {
    const options = await db.pollOptions.findMany({
      where: {
        pollId,
      },
      select: {
        id: true,
      },
    });

    const vote: Record<string, number> = {};

    for (let option of options) {
      const replies = await db.replies.count({
        where: {
          pollId,
          optionId: option.id,
        },
      });

      vote[option.id] = replies;
    }

    publish({ pollId, data: vote, event: SocketEvent.VOTE });

    console.info(`[PUBLISH VOTE] Update published for poll ${pollId}`);
  } catch (err) {
    console.warn(`[PUBLISH VOTE] Failed to push update for poll ${err}`);
  }
};

export const publishUpdate = async ({ id }: { id: string }) => {
  try {
    const poll = await db.polls.findUnique({
      where: {
        id,
      },
    });

    if (!poll) {
      console.warn(`[PUBLISH UPDATE POLL] Poll not found ${id}`);
      publish({ pollId: id, data: null, event: SocketEvent.DELETE });
      return;
    }

    if (!poll.isPublished) {
      console.warn(`[PUBLISH UPDATE POLL] Poll not found ${id}`);
      publish({
        pollId: id,
        data: poll,
        event: SocketEvent.UPDATE,
      });
      return;
    }

    const options = await db.pollOptions.findMany({
      where: {
        pollId: poll.id,
      },
      select: {
        id: true,
        option: true,
      },
    });

    const data = {
      ...poll,
      options,
    };

    publish({
      pollId: id,
      data: data,
      event: SocketEvent.UPDATE,
    });
    return;
  } catch (err) {
    console.warn(`[PUBLISH UPDATE POLL] Error happened ${err}`);

    return;
  }
};
