import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export type InputSize = "sm" | "md" | "lg";
export type InputVariant = "default" | "filled" | "ghost";
export type InputState = "idle" | "error" | "success" | "loading";

export interface InputProps extends Omit<
	InputHTMLAttributes<HTMLInputElement>,
	"size"
> {
	variant?: InputVariant;
	size?: InputSize;
	state?: InputState;
	label?: string;
	helperText?: string;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	fullWidth?: boolean;
}

const variantStyles: Record<InputVariant, string> = {
	default:
		"bg-[var(--bg-elevated-main)] text-primary border-[var(--bg-secondary)]" +
		"focus:border-spotify-green focus:ring-1 focus:ring-spotify-green",
	filled:
		"bg-spotify-elevated border border-transparent text-spotify-white " +
		"placeholder:text-spotify-muted " +
		"focus:border-spotify-green focus:ring-1 focus:ring-spotify-green",
	ghost:
		"bg-transparent border-0 border-b border-spotify-muted text-spotify-white " +
		"placeholder:text-spotify-muted rounded-none px-0 " +
		"focus:border-b-spotify-green focus:ring-0",
};

const sizeStyles: Record<InputSize, string> = {
	sm: "h-8 text-xs px-3",
	md: "h-11 text-sm px-4",
	lg: "h-14 text-base px-5",
};

const iconSizeStyles: Record<InputSize, string> = {
	sm: "w-3.5 h-3.5",
	md: "w-4 h-4",
	lg: "w-5 h-5",
};

const stateStyles: Record<InputState, string> = {
	idle: "",
	error: "!border-red-500 focus:!ring-red-500",
	success: "!border-green-500 focus:!ring-green-500",
	loading: "opacity-70 cursor-wait",
};

const helperTextColorStyles: Record<InputState, string> = {
	idle: "text-spotify-muted",
	error: "text-red-400",
	success: "text-green-400",
	loading: "text-spotify-muted",
};
const EMPTY_ICON = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E`;
const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			variant = "default",
			size = "md",
			state = "idle",
			label,
			helperText,
			leftIcon,
			rightIcon,
			fullWidth = false,
			className,
			id,
			disabled,
			...props
		},
		ref,
	) => {
		const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
		return (
			<div
				className={cn("flex flex-col gap-1.5", fullWidth ? "w-full" : "w-fit")}
			>
				{label && (
					<label
						htmlFor={inputId}
						className={cn(
							"text-xs font-semibold uppercase tracking-widest select-none",
							disabled
								? "text-spotify-muted opacity-50"
								: "text-spotify-subtext",
						)}
					>
						{label}
					</label>
				)}

				<div className="relative flex items-center">
					{leftIcon && (
						<span
							className={cn(
								"absolute left-3 flex items-center justify-center text-spotify-muted pointer-events-none bg-white",
								iconSizeStyles[size],
							)}
						>
							<img src={EMPTY_ICON} width="100%" height="100%" />
						</span>
					)}
					<input
						ref={ref}
						id={inputId}
						disabled={disabled || state === "loading"}
						className={cn(
							"w-full rounded-md outline-none transition-all duration-200",
							"disabled:opacity-50 disabled:cursor-not-allowed",
							variantStyles[variant],
							sizeStyles[size],
							stateStyles[state],
							leftIcon && "pl-9",
							rightIcon && "pr-9",
							className,
						)}
						{...props}
					/>

					{rightIcon && (
						<span
							className={cn(
								"absolute right-3 flex items-center justify-center text-spotify-muted bg-white",
								iconSizeStyles[size],
							)}
						>
							<img src={EMPTY_ICON} width="100%" height="100%" />
						</span>
					)}
				</div>

				{helperText && (
					<p
						className={cn(
							"text-xs leading-tight",
							helperTextColorStyles[state],
						)}
					>
						{helperText}
					</p>
				)}
			</div>
		);
	},
);

Input.displayName = "Input";

export { Input };
