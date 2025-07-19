import { requireUser } from "@domain/auth/auth.server"
import { getUser } from "@domain/utils/global-context"
import { AppSidebar } from "~/components/app-sidebar"
import { ChartAreaInteractive } from "~/components/chart-area-interactive"
import { DataTable } from "~/components/data-table"
import { SectionCards } from "~/components/section-cards"
import { SiteHeader } from "~/components/site-header"
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar"
import data from "~/dashboard/data.json"
import type { Route } from "./+types/dashboard"

export const loader = async () => {
	const user = getUser()
	return { data, user }
}

export const unstable_middleware = [requireUser]

export default function Page({ loaderData }: Route.ComponentProps) {
	const { data } = loaderData
	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "calc(var(--spacing) * 72)",
					"--header-height": "calc(var(--spacing) * 12)",
				} as React.CSSProperties
			}
		>
			<AppSidebar variant="inset" />
			<SidebarInset>
				<SiteHeader />
				<div className="flex flex-1 flex-col">
					<div className="@container/main flex flex-1 flex-col gap-2">
						<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
							<SectionCards />
							<div className="px-4 lg:px-6">
								<ChartAreaInteractive />
							</div>
							<DataTable data={data} />
						</div>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
