import { db } from "../../lib/db";
import { Poll } from "../../types/poll";
export const search = async ({
  page = 1,
  limit = 10,
  search,
}: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  try {
    const skip = (page - 1) * limit;

    const polls = await db.polls.findMany({
      skip,
      take: limit,
      where: {
        ...(search
          ? {
              question: {
                contains: search,
                mode: "insensitive",
              },
            }
          : {}),
      },
    });

    const total = await db.polls.count({
      where: {
        ...(search
          ? {
              question: {
                contains: search,
                mode: "insensitive",
              },
            }
          : {}),
      },
    });

    const totalPages = Math.ceil(total / limit);

    let data: Poll[] = [];

    for (let poll of polls) {
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

      const info: Poll = {
        ...poll,
        options,
        replies,
      };

      data.push(info);
    }

    return {
      status: 200,
      message: `Polls found`,
      page,
      limit,
      total,
      totalPages,
      data,
    };
  } catch (err) {
    console.warn(`[GET ALL POLL] Error happened ${err}`);

    return { status: 500, message: `Internal Server Error` };
  }
};
