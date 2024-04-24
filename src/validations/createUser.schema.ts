import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3),
  phone: z.string().min(11),
  email: z.string().email(),
  password: z.string().min(8),
  consfirmPassword: z.string().min(8),
});

export type ICreateUser = z.infer<typeof createUserSchema>;
