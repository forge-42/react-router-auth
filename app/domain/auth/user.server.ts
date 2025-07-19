import { hash } from "node:crypto"
import { getAuthSession } from "@domain/utils/global-context"
import { db } from "~/db/db.server"
import type { UserLoginData } from "./login.schema"
import type { NewUserData } from "./register.schema"

export async function getUserByEmail(email: string) {
	const user = await db.user.findUnique({
		where: { email },
		select: {
			id: true,
			email: true,
		},
	})
	return user
}

export async function registerUser(userData: NewUserData) {
	const existingUser = await getUserByEmail(userData.email)
	// User already exists, return an error
	if (existingUser) {
		return {
			errors: {
				email: {
					message: "Email already exists",
					type: "custom",
				},
			},
		}
	}

	// Create a new user
	const newUser = await db.user.create({
		data: {
			email: userData.email,
			password: {
				create: {
					hash: hash("sha256", userData.password),
				},
			},
		},
	})

	const authSession = getAuthSession()
	authSession.set("user", {
		id: newUser.id,
		email: newUser.email,
	})
	return {
		errors: null,
	}
}

export async function loginUser(loginData: UserLoginData) {
	const userExists = await getUserByEmail(loginData.email)
	if (!userExists) {
		return {
			errors: {
				email: {
					message: "This email does not exist",
				},
			},
		}
	}

	const loggedInUser = await db.user.findUnique({
		where: {
			email: loginData.email,
			password: {
				hash: hash("sha256", loginData.password),
			},
		},
	})

	if (!loggedInUser) {
		return {
			errors: {
				email: {
					message: "This password is incorrect",
				},
			},
		}
	}

	const authSession = getAuthSession()
	authSession.set("user", {
		email: loggedInUser.email,
		id: loggedInUser.id,
	})
	return {
		errors: null,
	}
}

export async function signoutUser() {
	return null
}
