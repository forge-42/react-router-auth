import { registerFormSchema } from "@domain/auth/register.schema"
import { registerUser } from "@domain/auth/user.server"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, href, redirect } from "react-router"
import { getValidatedFormData, useRemixForm } from "remix-hook-form"
import { Button } from "~/components/ui/button"
import { Input, InputError, InputField } from "~/components/ui/input"
import type { Route } from "./+types/_auth.register"

const resolver = zodResolver(registerFormSchema)

export const action = async ({ request }: Route.ActionArgs) => {
	const { errors, data } = await getValidatedFormData(request, resolver)
	if (errors) {
		return { errors }
	}
	const { errors: registrationErrors } = await registerUser(data)

	if (registrationErrors) {
		return {
			errors: registrationErrors,
		}
	}

	return redirect(href("/dashboard"))
}

export default function RegisterRoute() {
	const { handleSubmit, register, formState } = useRemixForm({
		resolver,
	})
	return (
		<Form onSubmit={handleSubmit} className="mx-auto flex h-full w-full items-center justify-center" method="post">
			<div className="mx-auto flex h-full w-full flex-col items-center justify-center gap-4 lg:w-2/3">
				<h1 className="mb-2 text-center text-6xl text-black lg:mb-4">Register</h1>
				<p className="text-center">Register below</p>
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
				<InputField>
					<Input
						{...register("confirmPassword")}
						error={!!formState.errors.confirmPassword}
						placeholder="Confirm password"
						type="password"
						className="w-full"
					/>
					<InputError>{formState.errors.confirmPassword?.message}</InputError>
				</InputField>

				<Button type="submit" size="lg">
					Register
				</Button>
			</div>
		</Form>
	)
}
