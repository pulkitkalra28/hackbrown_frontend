import React from 'react';
import { FormData } from '../CreateEventForm';

type Props = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: Partial<Record<keyof FormData, string>>;
};

export default function BasicInformation({ formData, setFormData, errors }: Props) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Basic Information</h2>

      <div className="space-y-6">
        {/* Event Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Enter event title"
            required
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
            required
          >
            <option value="">Select category</option>
            <option value="music">Music</option>
            <option value="dance">Dance</option>
            <option value="comedy">Comedy</option>
            <option value="sports">Sports</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>
      </div>
    </div>
  );
}
