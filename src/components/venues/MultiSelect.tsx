import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';

type Props = {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder: string;
};

export default function MultiSelect({ options, selected, onChange, placeholder }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    const newSelected = selected.includes(option)
      ? selected.filter(item => item !== option)
      : [...selected, option];
    onChange(newSelected);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50"
      >
        <span className="truncate">
          {selected.length > 0 ? selected.join(', ') : placeholder}
        </span>
        <ChevronDown className="w-5 h-5 text-gray-400" />
      </button>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selected.map(item => (
            <span
              key={item}
              className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-purple-100 text-purple-800"
            >
              {item}
              <button
                type="button"
                onClick={() => toggleOption(item)}
                className="ml-1 text-purple-600 hover:text-purple-800"
              >
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
      )}

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="max-h-60 overflow-auto">
            {options.map(option => (
              <label
                key={option}
                className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => toggleOption(option)}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-2">{option}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}