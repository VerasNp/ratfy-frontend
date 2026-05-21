import React from "react";
import Text from "../Text/index";
import NextLink from "next/link";
interface LinkProps {
	text: string;
	pathName: string;
	queryKey: string;
	pref?: boolean;
	size?: "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
	color?: string;
	hoverColor?: string;
}

export default function Link({
	pathName,
	text,
	pref = true,
	queryKey = "",
	size = "base",
	color = "--text-primary",
	hoverColor = "--text-primary-hover"
}: LinkProps) {
	const hrefVar = queryKey
		? { pathname: pathName, query: { keyword: queryKey } }
		: pathName;

	return (
		<>
			<NextLink href={hrefVar} prefetch={pref}>
				<Text
					textString={text}
					size={size}
					color={color}
					hoverColor={hoverColor}
				/>
			</NextLink>
		</>
	);
}
