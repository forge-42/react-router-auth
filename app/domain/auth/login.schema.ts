import z from "zod/v4"

export const loginFormSchema = z.object({
	email: z.email(),
	password: z.string().min(8).max(100),
	redirectTo: z.string().optional(),
})

export type UserLoginData = z.infer<typeof loginFormSchema>
