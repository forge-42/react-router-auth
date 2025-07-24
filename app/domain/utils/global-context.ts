import { AsyncLocalStorage } from "node:async_hooks"
import { getAuthSessionFromContext } from "@domain/auth/auth.server"
import { getUserByEmail } from "@domain/auth/user.server"
import type { User } from "@prisma-generated/client"
import type { Session, unstable_MiddlewareFunction } from "react-router"

type GlobalStorage = {
	authSession: Session
	user: Pick<User, "email" | "id"> | null
}

const globalStorage = new AsyncLocalStorage<GlobalStorage>()

const getGlobalStorage = () => {
	const storage = globalStorage.getStore()

	if (!storage) {
		throw new Error("Storage unavailable")
	}

	return storage
}

export const getAuthSession = () => {
	const storage = getGlobalStorage()
	return storage.authSession
}

export const getOptionalUser = () => {
	const storage = getGlobalStorage()
	return storage.user
}

export const getUser = () => {
	const user = getOptionalUser()
	if (!user) {
		throw new Error("User should be available here")
	}
	return user
}

export const globalStorageMiddleware: unstable_MiddlewareFunction<Response> = async ({ context }, next) => {
	const authSession = getAuthSessionFromContext(context)
	const userData = authSession.get("user")
	const user = userData?.email ? await getUserByEmail(userData.email) : null
	return new Promise((resolve) => {
		globalStorage.run(
			{
				authSession,
				user,
			},
			() => {
				resolve(next())
			}
		)
	})
}
