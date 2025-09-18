import { Response, Request } from "express";
import { DecodedToken } from "../types/auth";
import z from "zod";
import { create } from "../services/poll/create.service";
import { update } from "../services/poll/update.service";
import { search } from "../services/poll/search.service";
import { retrieve } from "../services/poll/retrieve.service";
import { del } from "../services/poll/delete.service";
import { CreateDTO, ShareDTO, UpdateDTO } from "../dto/poll.dto";
import { share } from "../services/poll/share.service";

export const createController = async (req: Request, res: Response) => {
  const user = res.locals.user as DecodedToken;
  const data = req.body as z.infer<typeof CreateDTO>;
  const { status, ...rest } = await create({ data, user });
  return res.status(status).json(rest);
};
export const updateController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = res.locals.user as DecodedToken;
  const data = req.body as z.infer<typeof UpdateDTO>;
  const { status, ...rest } = await update({ data, user, id });
  return res.status(status).json(rest);
};

export const deleteController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, ...rest } = await del({ id });
  return res.status(status).json(rest);
};
export const searchController = async (req: Request, res: Response) => {
  const { q, limit = 10, page = 1 } = req.query;
  if (q && typeof q !== "string") {
    return res.status(400).json({ message: "search 'q' can only be a string" });
  }
  const { status, ...rest } = await search({
    search: q,
    limit: Number(limit),
    page: Number(page),
  });
  return res.status(status).json(rest);
};

export const retrieveController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, ...rest } = await retrieve({ id });
  return res.status(status).json(rest);
};


export const shareController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = res.locals.user as DecodedToken;
  const data = req.body as z.infer<typeof ShareDTO>;
  const { status, ...rest } = await share({ data, user, id });
  return res.status(status).json(rest);
};
