import z from "zod";

const OptionDTO = z.object({
  option: z.string().min(1, { message: "option is required" }),
});

const CreateDTO = z.object({
  question: z.string().min(1, { message: "Question is required" }),
  description: z.string().optional(),
  options: z
    .array(OptionDTO)
    .min(1, { message: "Atleast one option is required" }),
});

const UpdateDTO = z.object({
  id: z.string().min(1, { message: "" }),
  question: z.string().min(1, { message: "Question is required" }),
  description: z.string().optional(),
  isPublished: z.boolean().default(true),
});

const ShareDTO = z.object({
  list: z.array(
    z.object({
      userId: z.string().min(1, { message: "userId can't be empty" }),
    })
  ),
  redirectURL: z.url({ message: "Redirect url is required" }),
});

export { UpdateDTO, CreateDTO, ShareDTO };
