import React from "react";

interface TextProps {
	textString: string;
	size?: "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | string;
	color?: string;
	weight?: "thin" | "normal" | "medium" | "bold" | "extrabold" | "black";
	underline?: boolean;
	hoverColor?: string;
	transitionTime?: number;
	cursor?: "default" | "pointer";
}

export default function Text({
	textString,
	size = "base",
	color = "--text-primary",
	weight = "normal",
	underline = false,
	hoverColor = color,
	transitionTime = 0.2,
	cursor = "default",
}: TextProps) {
	const weightClasses = {
		thin: "font-thin",
		normal: "font-normal",
		medium: "font-medium",
		bold: "font-bold",
		extrabold: "font-extrabold",
		black: "font-black",
	};

	const sizeClasses: Record<string, string> = {
		sm: "text-sm",
		base: "text-base",
		lg: "text-lg",
		xl: "text-xl",
		"2xl": "text-2xl",
		"3xl": "text-3xl",
		"4xl": "text-4xl",
	};

	const varColor = color.startsWith("#") ? color : `var(${color})`;
	const varHoverColor = hoverColor.startsWith("#") ? hoverColor : `var(${hoverColor})`;
	const isCustomSize = size.includes("px") || size.includes("rem");
	const appliedSizeClass = isCustomSize ? "" : (sizeClasses[size] || "text-base");

	return (
		<div
			className={`
				${appliedSizeClass}
				${weightClasses[weight]}
				${underline ? "underline" : ""}
				text-[var(--generic-base-color)]
				hover:text-[var(--generic-hover-color)]
			`}
			style={{
				...(isCustomSize ? { fontSize: size } : {}),
				"--generic-base-color": varColor,
				"--generic-hover-color": varHoverColor,
				cursor: cursor,
				transition: `color ${transitionTime}s`,
			} as React.CSSProperties}
		>
			{textString}
		</div>
	);
}
