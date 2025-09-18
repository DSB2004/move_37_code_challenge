import { CreateDTO, UpdateDTO } from "../dto/option.dto";
import { create } from "../services/options/create..service";
import { update } from "../services/options/update.service";
import { del } from "../services/options/delete.service";
import z from "zod";
import { Request, Response } from "express";
export const createController = async (req: Request, res: Response) => {
  const data = req.body as z.infer<typeof CreateDTO>;
  const { status, ...rest } = await create({ data });
  return res.status(status).json(rest);
};
export const updateController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body as z.infer<typeof UpdateDTO>;
  const { status, ...rest } = await update({ data, id });
  return res.status(status).json(rest);
};

export const deleteController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, ...rest } = await del({ id });
  return res.status(status).json(rest);
};
