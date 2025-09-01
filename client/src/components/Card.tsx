import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Card({
  className = "",
  children,
  ...props
}: CardProps) {
  const baseStyles =
    "rounded border border-wiki-gray-300 bg-white px-4 py-3 hover:border-wiki-blue/50 transition-all";

  const combinedClassName = `${baseStyles} ${className}`;

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
}
