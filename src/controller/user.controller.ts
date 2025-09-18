import { Response, Request } from "express";
import { DecodedToken } from "../types/auth";
import z from "zod";
import { AccountDTO } from "../dto/user.dto";
import { account } from "../services/user/account.service";
import { search } from "../services/user/search.service";
import { retrieve } from "../services/user/retrieve.service";

export const accountController = async (req: Request, res: Response) => {
  const user = res.locals.user as DecodedToken;
  const data = req.body as z.infer<typeof AccountDTO>;
  const { status, ...rest } = await account({ data, user });
  return res.status(status).json(rest);
};

export const searchController = async (req: Request, res: Response) => {
  const { q, limit = 10, page = 1 } = req.query;
  if (q && typeof q !== "string") {
    return res.status(400).json({ message: "search 'q' can only be a string" });
  }
  const { status, ...rest } = await search({
    query: q,
    limit: Number(limit),
    page: Number(page),
  });
  return res.status(status).json(rest);
};

export const retrieveController = async (req: Request, res: Response) => {
  const user = res.locals.user as DecodedToken;
  const { status, ...rest } = await retrieve({ user });
  return res.status(status).json(rest);
};
