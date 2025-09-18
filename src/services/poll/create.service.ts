import { CreateDTO } from "../../dto/poll.dto";
import z from "zod";
import { DecodedToken } from "../../types/auth";
import { db } from "../../lib/db";
export const create = async ({
  data,
  user,
}: {
  data: z.infer<typeof CreateDTO>;
  user: DecodedToken;
}) => {
  const { id } = user;
  const { options, question, description } = data;
  try {
    const poll = await db.$transaction(async (prisma) => {
      const poll = await prisma.polls.create({
        data: {
          question,
          description,
          ownerId: id,
        },
      });
      await prisma.pollOptions.createMany({
        data: options.map((ele) => {
          return {
            pollId: poll.id,
            option: ele.option,
          };
        }),
      });
      return poll;
    });

    console.info(`[CREATE POLL] Poll created ${poll.id}`);

    return { status: 201, message: `Poll Created ${poll.id}` };
  } catch (err) {
    console.warn(`[CREATE POLL[] Error happened ${err}`);

    return { status: 500, message: `Internal Server Error` };
  }
};
