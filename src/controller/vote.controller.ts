import { Request, Response } from "express";
import z from "zod";
import { VoteDTO } from "../dto/reply.dto";
import { retrieve } from "../services/vote/retrieve.service";
import { vote } from "../services/vote/vote.service";
import { DecodedToken } from "../types/auth";

export const voteController = async (req: Request, res: Response) => {
  const data = req.body as z.infer<typeof VoteDTO>;
  const { id } = req.params;
  const user = res.locals.user as DecodedToken;
  const { status, ...rest } = await vote({ data, user, id });
  return res.status(status).json(rest);
};

export const retrieveController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = res.locals.user as DecodedToken;
  const { status, ...rest } = await retrieve({ id, user });
  return res.status(status).json(rest);
};
