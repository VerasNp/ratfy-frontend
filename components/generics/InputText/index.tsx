"use client";

import { forwardRef, InputHTMLAttributes, ReactNode, useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Icon, { IconComponent } from "../Icon";
import { LucideX } from "lucide-react";

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export type InputSize = "sm" | "md" | "lg";
export type InputVariant =
	| "default"
	| "defaultOutline"
	| "defaultPreOutline"
	| "rounded"
	| "roundedOutline"
	| "roundedPreOutline";
export type InputState = "idle" | "error" | "success" | "loading";

interface InputRightIconProps {
	icon: IconComponent;
	action: "link" | "button";
	link?: string;
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
	leftIcon?: IconComponent;
	rightIcon?: InputRightIconProps;
	fullWidth?: boolean;
	clearable?: boolean;
}

const variantStyles: Record<InputVariant, string> = {
	default:
		"bg-[var(--bg-elevated-main)] text-primary border-[var(--bg-secondary)] rounded-md ",
	defaultOutline:
		"bg-[var(--bg-elevated-main)] border-[var(--bg-secondary)] text-primary rounded-md " +
		"has-[:focus]:ring-1 transition-border ease-linear duration-400",
	defaultPreOutline:
		"bg-[var(--bg-elevated-main)] border border-[var(--bg-secondary)] text-primary rounded-md " +
		"has-[:focus]:ring-1 transition-border ease-linear duration-400",
	rounded:
		"bg-[var(--bg-elevated-main)] text-primary border-[var(--bg-secondary)] rounded-full ",
	roundedOutline:
		"bg-[var(--bg-elevated-main)] border-[var(--bg-secondary)] text-primary rounded-full " +
		"has-[:focus]:ring-1 transition-border ease-linear duration-400",
	roundedPreOutline:
		"bg-[var(--bg-elevated-main)] border border-[var(--bg-secondary)] text-primary rounded-full " +
		"has-[:focus]:ring-1 transition-border ease-linear duration-400",
};

const sizeStyles: Record<InputSize, string> = {
	sm: "h-8 text-xs",
	md: "h-11 text-sm",
	lg: "h-14 text-base",
};

const iconSizeStyles: Record<
	InputSize,
	{
		sizeH: number;
		sizeW: number;
		leftMarginValue: number;
		rightMarginValue: number;
		clearButtonMarginValue: number;
	}
> = {
	sm: {
		sizeH: 5,
		sizeW: 5,
		leftMarginValue: 2,
		rightMarginValue: 2,
		clearButtonMarginValue: 1,
	},
	md: {
		sizeH: 8,
		sizeW: 8,
		leftMarginValue: 3,
		rightMarginValue: 3,
		clearButtonMarginValue: 2,
	},
	lg: {
		sizeH: 8,
		sizeW: 8,
		leftMarginValue: 4,
		rightMarginValue: 4,
		clearButtonMarginValue: 2,
	},
};

const stateStyles: Record<InputState, string> = {
	idle: "",
	error: "!border-red-500 focus:!ring-red-500",
	success: "!border-green-500 focus:!ring-green-500",
	loading: "opacity-70 cursor-wait",
};

const helperTextColorStyles: Record<InputState, string> = {
	idle: "text-gray-400",
	error: "text-red-400",
	success: "text-green-400",
	loading: "text-gray-400",
};

export default function InputText({
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
	clearable = false,
	...props
}: InputProps) {
	const [isFocused, setIsFocused] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
	return (
		<div
			className={cn("flex flex-col gap-1.5", fullWidth ? "w-full" : "w-fit")}
		>
			{label && (
				<label
					htmlFor={inputId}
					className={cn(
						"text-xs font-semibold",
						disabled ? "text-gray-400 opacity-50" : "text-white",
					)}
				>
					{label}
				</label>
			)}
			<div className={cn("flex items-center", variantStyles[variant])}>
				{leftIcon && (
					<span
						style={{
							marginLeft: `${iconSizeStyles[size].leftMarginValue * 0.25}rem`,
						}}
						className={cn(
							"flex items-center justify-center pointer-events-none transition-colors ease-linear duration-400",
							`h-${iconSizeStyles[size].sizeH}`,
							`w-${iconSizeStyles[size].sizeW}`,
							isFocused ? "text-white" : "text-gray-400",
						)}
					>
						<Icon src={leftIcon} />
					</span>
				)}
				<input
					style={{
						marginLeft: leftIcon
							? `${iconSizeStyles[size].leftMarginValue * 0.25}rem`
							: undefined,
						marginRight: rightIcon
							? `${iconSizeStyles[size].rightMarginValue * 0.25}rem`
							: undefined,
					}}
					id={inputId}
					disabled={disabled || state === "loading"}
					onFocus={(e) => {
						setIsFocused(true);
						props.onFocus?.(e);
					}}
					onBlur={(e) => {
						setIsFocused(false);
						props.onBlur?.(e);
					}}
					onChange={(e) => {
						setInputValue(e.target.value);
						props.onChange?.(e);
					}}
					value={inputValue}
					className={cn(
						"w-full rounded-md outline-none transition-all duration-200",
						sizeStyles[size],
						stateStyles[state],
						className,
					)}
					{...props}
				/>
				{clearable && (
					<>
						<button
							style={{
								marginRight: `${iconSizeStyles[size].clearButtonMarginValue * 0.25}rem`,
								opacity: inputValue ? 1 : 0,
								pointerEvents: inputValue ? "auto" : "none",
							}}
							type="button"
							className={cn(
								"flex items-center justify-center h-full cursor-pointer transition-all duration-200 text-gray-400 hover:text-white",
								`h-${iconSizeStyles[size].sizeH}`,
								`w-${iconSizeStyles[size].sizeW}`,
							)}
							onClick={() => {
								if (inputValue) {
									setInputValue("");
								}
							}}
						>
							<Icon src={LucideX} />
						</button>
						{rightIcon && (
							<div
								style={{
									height: `${iconSizeStyles[size].sizeH * 0.2}rem`,
									opacity: inputValue ? 1 : 0,
								}}
							>
								<span className="before:content-[''] before:block before:-translate-x-1/2 before:w-px before:bg-gray-400 before:h-full"></span>
							</div>
						)}
					</>
				)}
				{rightIcon && rightIcon.action === "link" && (
					<a href={rightIcon.link} className="contents">
						<span
							style={{
								marginRight: `${iconSizeStyles[size].rightMarginValue * 0.25}rem`,
								marginLeft: clearable
									? `${iconSizeStyles[size].clearButtonMarginValue * 0.25}rem`
									: undefined,
							}}
							className={cn(
								"flex items-center justify-center text-gray-400 hover:text-white transition-colors ease-linear duration-400",
								`h-${iconSizeStyles[size].sizeH}`,
								`w-${iconSizeStyles[size].sizeW}`,
							)}
						>
							<Icon src={rightIcon.icon} />
						</span>
					</a>
				)}
			</div>
			{helperText && (
				<p
					className={cn("text-xs leading-tight", helperTextColorStyles[state])}
				>
					{helperText}
				</p>
			)}
		</div>
	);
}
