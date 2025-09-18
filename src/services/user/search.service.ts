import { db } from "../../lib/db";
export const search = async ({
  query,
  page = 1,
  limit = 10,
}: {
  query?: string;
  limit?: number;
  page?: number;
}) => {
  try {
    const skip = (page - 1) * limit;

    const users = await db.users.findMany({
      where: {
        ...(query
          ? {
              username: {
                mode: "insensitive",
                contains: query,
              },
            }
          : {}),
      },
      skip,
      take: limit,
      select: {
        username: true,
        id: true,
        email: true,
        bio: true,
        createdAt: true,
      },
    });

    const total = await db.users.count({
      where: {
        ...(query
          ? {
              username: {
                contains: query,
                mode: "insensitive",
              },
            }
          : {}),
      },
    });

    const totalPage = Math.ceil(total / limit);

    return {
      status: 200,
      message: `Users list with similar username`,
      users,
      total,
      totalPage,
      limit,
      page,
    };
  } catch (err) {
    console.error(`[GET USERS] Error happened ${err}`);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
};
