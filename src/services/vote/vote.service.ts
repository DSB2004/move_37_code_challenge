import { db } from "../../lib/db";

import { VoteDTO } from "../../dto/reply.dto";
import z from "zod";
import { DecodedToken } from "../../types/auth";
import { publishVote } from "../../utils/vote.util";
export const vote = async ({
  data,
  user,
  id,
}: {
  id: string;
  data: z.infer<typeof VoteDTO>;
  user: DecodedToken;
}) => {
  try {
    const { id: userId } = user;
    const { optionId } = data;
    const poll = await db.polls.findUnique({
      where: {
        id: id,
      },
    });

    if (!poll) {
      console.warn(`[VOTE] Poll not found ${id}`);
      return { status: 404, message: "Poll not found" };
    }

    const userDetails = await db.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userDetails) {
      console.warn(`[VOTE] User not found ${id}`);
      return { status: 404, message: "User not found" };
    }

    const option = await db.pollOptions.findUnique({
      where: {
        id: optionId,
      },
    });

    if (!option) {
      console.warn(`[VOTE] Option not found ${id}`);
      return { status: 404, message: "Option not found" };
    }

    const check = await db.replies.findUnique({
      where: {
        pollId_userId: {
          pollId: id,
          userId,
        },
      },
    });
    if (!check || check === null) {
      await db.replies.create({
        data: {
          pollId: id,
          optionId,
          userId,
        },
      });
    } else {
      await db.replies.update({
        where: {
          pollId_userId: {
            pollId: id,
            userId,
          },
        },
        data: {
          optionId,
        },
      });
    }
    await publishVote({ pollId: id });
    return { status: 200, message: `Vote added/updated` };
  } catch (err) {
    console.warn(`[VOTE POLL] Error happened ${err}`);
    return { status: 500, message: `Internal Server Error` };
  }
};
