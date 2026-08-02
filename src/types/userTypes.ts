import z from 'zod'

const userDataSchema = z.object({
    email: z.email(),
    password: z.string().min(5)
});

export type User = z.infer<typeof userDataSchema>