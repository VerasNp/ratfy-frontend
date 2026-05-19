import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export type InputSize = "sm" | "md" | "lg";
export type InputVariant =
	| "default"
	| "defaultFilled"
	| "rounded"
	| "roundedFilled";
export type InputState = "idle" | "error" | "success" | "loading";

interface InputRightIconProps {
	children: ReactNode;
	action: "link" | "button";
}

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
	rightIcon?: InputRightIconProps;
	fullWidth?: boolean;
}

const variantStyles: Record<InputVariant, string> = {
	default:
		"bg-[var(--bg-elevated-main)] text-primary border-[var(--bg-secondary)]",
	defaultFilled:
		"bg-[var(--bg-elevated-main)] border-[var(--bg-secondary)] text-primary " +
		"focus:ring-1",
	rounded:
		"bg-[var(--bg-elevated-main)] text-primary border-[var(--bg-secondary)] rounded-full ",
	roundedFilled:
		"bg-[var(--bg-elevated-main)] border-[var(--bg-secondary)] text-primary rounded-full " +
		"focus:ring-1",
};

const sizeStyles: Record<InputSize, string> = {
	sm: "h-8 text-xs px-3",
	md: "h-11 text-sm px-4",
	lg: "h-14 text-base px-5",
};

const iconSizeStyles: Record<
	InputSize,
	{ size: string; leftPadding: string; rightPadding: string }
> = {
	sm: {
		size: "w-3.5 h-3.5",
		leftPadding: "pl-8",
		rightPadding: "pr-8",
	},
	md: {
		size: "w-4 h-4",
		leftPadding: "pl-9",
		rightPadding: "pr-9",
	},
	lg: {
		size: "w-6 h-6",
		leftPadding: "pl-12",
		rightPadding: "pr-12",
	},
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
								"absolute left-3 flex items-center justify-center text-spotify-muted pointer-events-none",
								iconSizeStyles[size].size,
							)}
						>
							{leftIcon}
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
							leftIcon && iconSizeStyles[size].leftPadding,
							rightIcon && iconSizeStyles[size].rightPadding,
							className,
						)}
						{...props}
					/>

					{rightIcon && (
						<a href="www.google.com">
							<span
								className={cn(
									"absolute right-3 flex items-center justify-center text-spotify-muted",
									iconSizeStyles[size].size,
								)}
							>
								{rightIcon.children}
							</span>
						</a>
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
