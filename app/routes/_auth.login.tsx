import { zodResolver } from "@hookform/resolvers/zod"
import { Form, href } from "react-router"
import { getValidatedFormData, useRemixForm } from "remix-hook-form"
import { z } from "zod/v4"
import { Button } from "~/components/ui/button"
import { Input, InputError, InputField } from "~/components/ui/input"
import { Link } from "~/library/link"
import type { Route } from "./+types/_auth.login"

const loginFormSchema = z.object({
	email: z.email(),
	password: z.string().min(8).max(100),
	redirectTo: z.string().optional(),
})

const resolver = zodResolver(loginFormSchema)

export const action = async ({ request }: Route.ActionArgs) => {
	const { errors } = await getValidatedFormData(request, resolver)
	if (errors) {
		return { errors }
	}
	// your implementation here
	return null
}

export default function LoginRoute() {
	const { handleSubmit, register, formState } = useRemixForm({
		resolver,
	})
	return (
		<Form onSubmit={handleSubmit} className="flex h-full items-center justify-center" method="post">
			<div className="mx-auto flex h-full w-full flex-col items-center justify-center gap-4 lg:w-2/3">
				<h1 className="mb-2 text-center text-6xl text-black lg:mb-4">Login</h1>
				<p className="text-center">Login below</p>
				<InputField>
					<Input
						{...register("email")}
						error={!!formState.errors.email}
						placeholder="Enter your email"
						autoFocus
						className="w-full"
					/>
					<InputError>{formState.errors.email?.message}</InputError>
				</InputField>
				<InputField>
					<Input
						{...register("password")}
						error={!!formState.errors.password}
						placeholder="Enter your password"
						className="w-full"
						type="password"
					/>
					<InputError>{formState.errors.password?.message}</InputError>
				</InputField>

				<Link viewTransition={false} to={href("/forgot-password")}>
					Forgot password?
				</Link>
				<Button type="submit" size="lg">
					Login
				</Button>
			</div>
		</Form>
	)
}
