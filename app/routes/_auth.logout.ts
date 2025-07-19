import { getAuthSession } from "@domain/utils/global-context"
import { redirect } from "react-router"

export const action = () => {
	const authSession = getAuthSession()
	authSession.unset("user")
	return redirect("/login")
}
