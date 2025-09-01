import React from "react";

type ButtonVariant = "primary" | "secondary" | "outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

export default function Button({
  variant = "primary",
  fullWidth = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles = "rounded px-4 py-2 font-medium hover:cursor-pointer";
  const widthStyles = fullWidth ? "w-full" : "w-auto";

  const variantStyles = {
    primary:
      "bg-wiki-gray-50 hover:bg-wiki-gray-100 text-wiki-text border border-wiki-gray-300",
    secondary:
      "bg-[#C2DFFF] hover:bg-wiki-blue text-wiki-text border border-wiki-gray-300",
    outline:
      "bg-white hover:bg-wiki-gray-50 text-wiki-text border border-wiki-gray-300",
  };

  const combinedClassName = `${baseStyles} ${widthStyles} ${variantStyles[variant]} ${className}`;

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}
