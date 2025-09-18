import { db } from "../../lib/db";
import { UpdateDTO } from "../../dto/option.dto";
import { publishUpdate } from "../../utils/vote.util";
import z from "zod";
export const update = async ({
  id,
  data,
}: {
  id: string;
  data: z.infer<typeof UpdateDTO>;
}) => {
  const { option } = data;

  try {
    const check = await db.pollOptions.findUnique({
      where: {
        id,
      },
    });
    if (!check) {
      console.warn("[UPDATE OPTION] Option not found");
      return { status: 404, message: "Option not found" };
    }
    await db.pollOptions.update({
      where: {
        id,
      },
      data: {
        option,
      },
    });

    console.info(`[UPDATE OPTION] Option updated ${id}`);
    await publishUpdate({ id: check.pollId });
    return { status: 200, message: `Option updated ${id}` };
  } catch (err) {
    console.warn(`[UPDATE OPTIONS] Error happened ${err}`);

    return { status: 500, message: `Internal Server Error` };
  }
};
