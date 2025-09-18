import { CreateDTO } from "../../dto/option.dto";
import z from "zod";
import { db } from "../../lib/db";
import { publishUpdate } from "../../utils/vote.util";
export const create = async ({ data }: { data: z.infer<typeof CreateDTO> }) => {
  const { options, pollId } = data;
  try {
    const check = await db.polls.findUnique({
      where: {
        id: pollId,
      },
    });
    if (!check) {
      console.warn("[CREATE OPTION] Poll not found");
      return { status: 404, message: "Poll not found" };
    }
    await db.pollOptions.createMany({
      data: options.map((ele) => {
        return {
          pollId: pollId,
          option: ele.option,
        };
      }),
    });

    console.info(`[CREATE OPTIONS] Options created for ${pollId}`);
    await publishUpdate({ id: pollId });
    return { status: 201, message: `Options created for ${pollId}` };
  } catch (err) {
    console.warn(`[CREATE OPTIONS] Error happened ${err}`);

    return { status: 500, message: `Internal Server Error` };
  }
};
