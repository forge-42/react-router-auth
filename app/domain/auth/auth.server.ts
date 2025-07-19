import { createCookieSessionStorage, href, redirect, type unstable_MiddlewareFunction } from "react-router"
import { unstable_createSessionMiddleware as sessionMiddleware } from "remix-utils/middleware/session"

const authSessionStorage = createCookieSessionStorage({
	cookie: {
		name: "session",
		httpOnly: true,
		sameSite: "lax",
		path: "/",
		maxAge: 60 * 60 * 24 * 7, // 1 week
	},
})

const [authSessionMiddleware, getAuthSessionFromContext] = sessionMiddleware(authSessionStorage)

export { authSessionMiddleware, getAuthSessionFromContext }

export const requireUser: unstable_MiddlewareFunction = ({ context }, next) => {
	const authSession = getAuthSessionFromContext(context)
	const session = authSession.get("user")
	if (!session) {
		throw redirect(href("/login"))
	}
	return next()
}
