import React from "react";
import NextImage from "next/image";

interface ImageProps {
  src: string;
  alt: string;
  size?: number;
  shape?: "square" | "rounded";
  className?: string;
}
export default function Image({
  src,
  alt,
  size = 64, // Tamanho padrão se não for informado
  shape = "square",
  className = "",
}: ImageProps) {
  // Dicionário de formatos usando classes do Tailwind
  const shapeClasses = {
    square: "rounded-none",
    rounded: "rounded-md",
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
