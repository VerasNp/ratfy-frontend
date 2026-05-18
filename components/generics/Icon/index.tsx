import { StaticImageData } from "next/image";
import { ComponentProps, ElementType } from "react";

type IconComponent = ElementType<{
	size?: number | string;
	className?: string;
	style?: React.CSSProperties;
	color?: string;
}>;

type IconProps =
	| ({ src: StaticImageData } & Omit<ComponentProps<"img">, "src">)
	| {
			src: IconComponent;
			size?: number | string;
			className?: string;
			style?: React.CSSProperties;
			color?: string;
	  };

function isStaticImage(
	src: StaticImageData | IconComponent,
): src is StaticImageData {
	return typeof src === "object" && "src" in src;
}

const EMPTY_ICON = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E`;

export default function Icon({ src, ...props }: IconProps) {
	if (isStaticImage(src)) {
		const { width, height, style, ...rest } = props as ComponentProps<"img">;
		const hasExplicitSize = width !== undefined && height !== undefined;
		return (
			<img
				src={EMPTY_ICON}
				width={hasExplicitSize ? width : "100%"}
				height={hasExplicitSize ? height : "100%"}
				style={{
					...style,
					backgroundColor: "currentColor",
					mask: `url(${src.src}) no-repeat center / contain`,
				}}
				{...rest}
			/>
		);
	}
	const LucideIcon = src;
	const { size, className, style, color } = props as {
		size?: number | string;
		className?: string;
		style?: React.CSSProperties;
		color?: string;
	};

	return (
		<LucideIcon
			size={size ?? 24}
			className={className}
			style={style}
			color={color ?? "currentColor"}
		/>
	);
}
