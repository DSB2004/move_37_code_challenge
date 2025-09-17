import z from "zod";

const OptionDTO = z.object({
  option: z.string().min(1, { message: "option is required" }),
});

const CreateDTO = z.object({
  question: z.string().min(1, { message: "Question is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  options: z
    .array(OptionDTO)
    .min(1, { message: "Atleast one option is required" }),
});

const UpdateDTO = z.object({
  question: z.string().min(1, { message: "Question is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  options: z
    .array(OptionDTO)
    .min(1, { message: "Atleast one option is required" }),
});

export { UpdateDTO, CreateDTO };
