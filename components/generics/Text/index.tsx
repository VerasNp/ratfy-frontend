import React from "react";
interface TextProps {
  textString: string;
  size?: string;
  color?: string;
  weight?: "thin" | "normal" | "medium" | "bold" | "extrabold" | "black";
  underline?: false | true;
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
  const varColor = color.startsWith("#") ? color : `var(${color})`;
  const varHoverColor = hoverColor.startsWith("#")
    ? hoverColor
    : `var(${hoverColor})`;

  return (
    <>
      <p
        className={`
          text-${size}
          ${weightClasses[weight]}
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
