import type * as React from "react"

import { cn } from "~/lib/utils"

export function InputField({ children }: React.PropsWithChildren) {
	return <div className="flex w-full flex-col gap-1">{children}</div>
}

export function Input({
	className,
	type,
	error,
	...props
}: React.ComponentProps<"input"> & {
	error?: boolean
}) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				"flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
				"focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
				"aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
				error &&
					"border-destructive aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
				className
			)}
			{...props}
		/>
	)
}

export function InputError({ children }: React.PropsWithChildren) {
	return (
		<p className="mt-0 w-full text-left text-destructive text-sm" role="alert">
			{children}
		</p>
	)
}
