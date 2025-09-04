import React from "react";

type NavigationLink = {
  text: string;
  href: string;
  onClick?: () => void;
};

type WikiNavigationProps = {
  title?: string;
  links: NavigationLink[];
};

export default function WikiNavigation({
  title = "Navigation",
  links,
}: WikiNavigationProps) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-sm p-4">
      <h3 className="text-base font-serif text-black mb-2 font-normal">
        {title}
      </h3>
      <ul className="text-sm text-blue-600 space-y-1">
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              className="hover:underline"
              onClick={link.onClick}
            >
              • {link.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
