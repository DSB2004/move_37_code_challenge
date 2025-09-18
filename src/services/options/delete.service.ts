import { db } from "../../lib/db";
import { publishUpdate } from "../../utils/vote.util";
export const del = async ({ id }: { id: string }) => {
  try {
    const option = await db.pollOptions.findUnique({
      where: {
        id,
      },
    });
    if (!option) {
      console.warn("[DELETE OPTION] Option not found");
      return { status: 404, message: "Option not found" };
    }
    await db.$transaction(async (prisma) => {
      await prisma.replies.deleteMany({
        where: {
          optionId: id,
        },
      });
      await prisma.pollOptions.delete({
        where: {
          id,
        },
      });
    });

    console.info(`[DELETE OPTION] Option deleted ${id}`);
    publishUpdate({ id: option.pollId });
    return { status: 200, message: `Option deleted ${id}` };
  } catch (err) {
    console.warn(`[DELETE OPTIONS] Error happened ${err}`);

    return { status: 500, message: `Internal Server Error` };
  }
};
