import { useRouteLoaderData } from "react-router"
import type { Route } from "../routes/+types/dashboard"

export function useDashboardData() {
	const match = useRouteLoaderData<Route.ComponentProps["loaderData"]>("routes/dashboard")
	if (!match) {
		throw new Error("this dashboard data does not exist on the current route")
	}
	return match
}
