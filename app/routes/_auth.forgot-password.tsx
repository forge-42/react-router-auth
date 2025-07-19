import { href } from "react-router"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Link } from "~/library/link"

export default function ForgotPasswordRoute() {
	return (
		<div className="mx-auto flex h-full w-full flex-col items-center justify-center gap-4 lg:w-2/3">
			<h1 className="mb-2 text-center text-6xl text-black lg:mb-4">Forgot password</h1>
			<p className="text-center">Forgot password description</p>
			<Input className="w-full" placeholder="Enter your email" name="email" />
			<Link viewTransition={false} to={href("/login")} />
			<Button size="lg">Send password reset email</Button>
		</div>
	)
}
