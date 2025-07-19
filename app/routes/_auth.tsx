import { href, Outlet, useLocation } from "react-router"
import { Button } from "~/components/ui/button"
import { Link } from "~/library/link"
import { cn } from "~/utils/css"

const useGetCurrentPage = () => {
	// Used to retrieve the url
	const location = useLocation()
	// Gets the current path name (url)
	const url = location.pathname
	return {
		// Ends with login? We are on the login page
		isLoginPage: url.endsWith("/login"),
		// Ends with register? We are on the register page
		isRegisterPage: url.endsWith("/register"),
		// Ends with forgot password? we are on the forgot password page
		isForgotPasswordPage: url.endsWith("/forgot-password"),
	}
}
export default function LoginLayout() {
	const { isForgotPasswordPage, isLoginPage, isRegisterPage } = useGetCurrentPage()

	const key = isLoginPage ? "Login" : "Register"
	return (
		<div className="relative z-10 flex min-h-screen w-full items-start justify-center overflow-hidden md:items-center">
			<div className="relative z-10 flex h-screen w-full flex-col-reverse bg-white drop-shadow-2xl md:h-[75vh] md:w-11/12 md:flex-row lg:w-2/3">
				<div
					className={cn(
						// Color of the box, add what you want!
						"bg-gradient-to-br from-10% from-indigo-500 via-30% via-sky-500 to-90% to-emerald-500",
						"z-20 flex h-full w-full origin-left scale-x-100 flex-col items-center justify-center p-4 px-8 transition-all md:w-1/2 lg:px-20",
						// On register page this box will be on the right side
						isRegisterPage && "md:translate-x-full",
						// On forgot password page this block will be hidden
						isForgotPasswordPage && " scale-x-0"
					)}
				>
					<div className="flex flex-col items-center gap-4">
						<h1 className="!text-6xl text-center text-black">{key} Title</h1>
						<p className="font-semibold text-black">{key} Description</p>

						<Link to={isLoginPage ? href("/register") : href("/login")}>
							<Button>{key === "Login" ? "Register" : "Login"}</Button>
						</Link>
					</div>
				</div>

				<div
					className={cn(
						"z-10 w-full p-8 transition-transform md:w-1/2 lg:p-0",
						isRegisterPage && "md:-translate-x-full",
						isForgotPasswordPage && "-translate-x-1/2"
					)}
				>
					<Outlet />
				</div>
			</div>
		</div>
	)
}
