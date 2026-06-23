import React from "react";
import NextImage from "next/image";

interface ImageProps {
  src: string;
  alt: string;
  size?: number;
  shape?: "square" | "rounded" | "circle";
  className?: string;
}
export default function Image({
  src,
  alt,
  size = 64, // Tamanho padrão se não for informado
  shape = "rounded",
  className = "",
}: ImageProps) {
  // Dicionário de formatos usando classes do Tailwind
  const shapeClasses = {
    square: "rounded-none",
    rounded: "rounded-md",
    circle: "rounded-full",
  };

  return (
    <NextImage
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`${shapeClasses[shape]} object-cover ${className}`}
    />
  );
}
