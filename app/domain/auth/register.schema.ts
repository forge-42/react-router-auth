import z from "zod/v4"

export const registerFormSchema = z
	.object({
		email: z.email(),
		password: z.string().min(8).max(100),
		confirmPassword: z.string().min(8).max(100),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	})

export type NewUserData = z.infer<typeof registerFormSchema>
