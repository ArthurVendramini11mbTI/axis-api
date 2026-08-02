import z from 'zod'

const userDataSchema = z.object({
    email: z.email(),
    password: z.string().min(6)
});

export type UserRole = "USER" | "ADMIN";

export type AuthenticatedUser = {
  id: number;
  email: string;
  role: UserRole;
};

export type User = z.infer<typeof userDataSchema>