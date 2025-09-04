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
    "panel px-5 py-4 transition-all hover:shadow-lg hover:shadow-black/20";

  const combinedClassName = `${baseStyles} ${className}`;

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
}
