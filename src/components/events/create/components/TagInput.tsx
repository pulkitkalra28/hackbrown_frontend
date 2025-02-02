import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

type Props = {
  tags: string[];
  onChange: (tags: string[]) => void;
  maxTags?: number;
};

export default function TagInput({ tags, onChange, maxTags = 5 }: Props) {
  const [input, setInput] = useState('');

  const handleAddTag = () => {
    const newTag = input.trim();
    if (newTag && !tags.includes(newTag) && tags.length < maxTags) {
      onChange([...tags, newTag]);
      setInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={tags.length >= maxTags}
          placeholder={tags.length >= maxTags ? "Maximum tags reached" : "Enter a tag"}
          className="flex-1 rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
        />
        <button
          type="button"
          onClick={handleAddTag}
          disabled={!input.trim() || tags.length >= maxTags}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-2 text-purple-600 hover:text-purple-800"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
      
      <p className="text-sm text-gray-500 mt-1">
        {maxTags - tags.length} tags remaining
      </p>
    </div>
  );
}