import React from "react";

type BreadcrumbItem = {
  text: string;
  href?: string;
  onClick?: () => void;
};

type WikiHeaderProps = {
  breadcrumbs: BreadcrumbItem[];
};

export default function WikiHeader({ breadcrumbs }: WikiHeaderProps) {
  return (
    <div className="border-b border-gray-300 bg-gray-50 px-4 py-2">
      <div className="max-w-4xl mx-auto">
        <div className="text-xs text-gray-600">
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && " • "}
              {item.href || item.onClick ? (
                <a
                  href={item.href || "#"}
                  className="text-blue-600 hover:underline"
                  onClick={item.onClick}
                >
                  {item.text}
                </a>
              ) : (
                <span>{item.text}</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
