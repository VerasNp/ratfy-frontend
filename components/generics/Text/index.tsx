import React from "react";
interface TextProps {
  textString: string;
  size?: "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  color?: string;
  weigth?: "thin" | "normal" | "medium" | "bold" | "extrabold" | "black";
  underline?: false | true;
  hoverColor?: string;
  transitionTime?: number;
  cursor?: "default" | "pointer";
}

export default function Text({
  textString,
  size = "base",
  color = "--text-primary",
  weigth = "normal",
  underline = false,
  hoverColor = color,
  transitionTime = 0.2,
  cursor = "default",
}: TextProps) {
  const sizeClasses = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    h1: "text-4xl",
    h2: "text-3xl",
    h3: "text-2xl",
  };
  const weigthClasses = {
    thin: "font-thin",
    normal: "font-normal",
    medium: "font-medium",
    bold: "font-bold",
    extrabold: "font-extrabold",
    black: "font-black",
  };
  const varColor = color.startsWith("#") ? color : `var(${color})`;
  const varHoverColor = hoverColor.startsWith("#")
    ? hoverColor
    : `var(${hoverColor})`;

  return (
    <>
      <p
        className={`
          ${sizeClasses[size]}
          ${weigthClasses[weigth]}
          ${underline ? "underline" : ""}
          text-[var(--generic-base-color)]
          hover:text-[var(--generic-hover-color)]
          cursor-(--generic-cursor-value)
          `}
        style={{
          "--generic-base-color": varColor,
          "--generic-hover-color": varHoverColor,
          "--generic-cursor-value": cursor,
          transition: transitionTime,
        }}
      >
        {textString}
      </p>
    </>
  );
}
