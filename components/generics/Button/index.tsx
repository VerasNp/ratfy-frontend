import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: 'primary' | 'secondary' | 'brand' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

const variantStyles = {
  primary: 'bg-bg-primary text-black',
  secondary: 'bg-text-secondary text-black',
  brand: 'bg-bg-brand text-black',
  ghost: 'bg-transparent text-white'
};

const sizeStyles = {
  sm: 'px-4 py-1 text-sm font-semibold',
  md: 'px-8 py-3 text-base font-bold',
  lg: 'px-12 py-4 text-lg font-bold',
  icon: 'p-3 flex items-center justify-center aspect-square'
};

export default function Button({
  className = '',
  variant = 'primary',
  size = 'md',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-full disabled:opacity-50 disabled:cursor-not-allowed';

  const classes = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
}