import React from 'react';

type FooterSectionProps = {
  title: string;
  links: string[];
};

export default function FooterSection({ title, links }: FooterSectionProps) {
  return (
    <div>
      <h3 className="font-semibold text-gray-100 mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <button className="text-gray-300 hover:text-purple-300 transition-colors text-sm">
              {link}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}